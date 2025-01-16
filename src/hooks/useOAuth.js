import { useState, useEffect } from 'react';

export default function useOAuth() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');

    if (codeParam) {
      (async () => {
        try {
          // Exchange code -> GitHub access_token
          const response = await fetch(
            `http://localhost:3000/api/oauth/github/access-token?code=${codeParam}`,
          );
          const data = await response.json();
          const githubAccessToken = data.access_token;

          // Use that token to get GitHub user data from /github/userdata
          const userDataResponse = await fetch(
            'http://localhost:3000/api/oauth/github/userdata',
            {
              method: 'GET',
              headers: { Authorization: 'Bearer ' + githubAccessToken },
            },
          );
          const githubProfile = await userDataResponse.json();

          // Upsert user in DB => server sets an http-only cookie
          await fetch('http://localhost:3000/api/oauth/github', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Important!
            body: JSON.stringify({
              githubId: githubProfile.id,
              login: githubProfile.login,
              name: githubProfile.name,
              email: githubProfile.email,
              avatarUrl: githubProfile.avatar_url,
            }),
          });

          // Cookie is now set. Navigating to /habits
        } catch (err) {
          console.error('OAuth error:', err);
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setIsLoading(false);
    }
  }, []);

  return isLoading;
}
