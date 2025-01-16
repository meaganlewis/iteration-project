// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import HabitsTracker from './components/HabitsTracker';
import healthLogo from './assets/health_logo.png';
import History from './components/History';
import UserEntries from './components/card'; // so we can reference this inside nested routes

function App() {
  return (
    <Router>
      <Routes>
        {/* Home (logo) page */}
        <Route
          path='/'
          element={
            <div>
              <img src={healthLogo} className='logo health' alt='Health logo' />
              <h1>Health App</h1>
              <Link to='/login' className='read-the-docs'>
                Log in to learn more
              </Link>
            </div>
          }
        />
        {/* Login page */}
        <Route path='/login' element={<Login />} />
        {/* Signup page */}
        <Route path='/signup' element={<Signup />} />

        {/**
         *  /habits is the "parent route" with nested routes inside
         *  The parent route itself will render <HabitsTracker />
         */}
        <Route path='/habits' element={<HabitsTracker />}>
          {/* /habits — default child route (the "Healthy Habits" content) */}
          <Route index element={<UserEntries />} />

          {/* /habits/history — second child route (the "History" content) */}
          <Route path='history' element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
