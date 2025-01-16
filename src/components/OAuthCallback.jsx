import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthCallback() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the ?code= from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');

    if (!codeParam) {
      // No code => error out or show a message
      setError('No OAuth code found in the URL.');
      setIsLoading(false);
      return;
    }

    (async function handleGitHubOAuth() {
      try {
        // Get the GitHub access token from your backend
        const tokenRes = await fetch(
          `http://localhost:3000/api/oauth/github/access-token?code=${codeParam}`,
        );
        const tokenData = await tokenRes.json();

        const githubAccessToken = tokenData.access_token;
        if (!githubAccessToken) {
          throw new Error('No access_token returned from server');
        }

        // Fetch user data from GitHub (using that token)
        const userDataRes = await fetch(
          'http://localhost:3000/api/oauth/github/userdata',
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${githubAccessToken}` },
          },
        );
        const githubProfile = await userDataRes.json();

        // Upsert the user in your DB => server sets an http-only cookie with JWT
        const upsertRes = await fetch(
          'http://localhost:3000/api/oauth/github',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // important to allow setting the cookie
            body: JSON.stringify({
              githubId: githubProfile.id,
              login: githubProfile.login,
              name: githubProfile.name,
              email: githubProfile.email,
              avatarUrl: githubProfile.avatar_url,
            }),
          },
        );

        if (!upsertRes.ok) {
          throw new Error('Error upserting user in local DB');
        }

        // Done: server has set the http-only cookie. Now user is "logged in."
        // Redirect them to your habits page
        navigate('/habits');
      } catch (err) {
        setError(err.message);
        console.error('Error in OAuth flow:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [navigate]);

  // Show a loading message while processing
  if (isLoading) {
    return <p>Finishing sign-in...</p>;
  }

  // Show an error if something went wrong
  if (error) {
    return <p className='text-danger'>Error: {error}</p>;
  }

  // If we’ve successfully navigated away, this shouldn’t render,
  // but you can return null or a fallback UI
  return null;
}
