import { useState } from 'react';
import '../styles/habitsTracker.css';
import UserEntries from './card';
import { Link } from 'react-router-dom';

export default function HabitsTracker() {
  const [active, setActive] = useState('tab-1');

  const handleClick = (event) => {
    setActive(event.target.id);
  };

  return (
    <div>
      <div className='container'>
        <div className='tabs'>
          <Link
            to='/habits'
            className={`tab-button ${
              active === 'tab-1' ? 'active' : ''
            } id='tab-1' onClick={handleClick}`}
          >
            Healthy Habits
          </Link>
          <Link
            to='/history'
            className={`tab-button ${active === 'tab-2' ? 'active' : ''}`}
            id='tab-2'
            onClick={handleClick}
          >
            History
          </Link>
        </div>
        <div className='tabs-content'>
          <div className={`tab-page ${active === 'tab-1' ? 'active' : ''}`}>
            <h2>Exercises</h2>
            <p>Log your workouts, set goals, and monitor progress.</p>
            {/* Add the WorkoutEntry component here */}
            <UserEntries />
          </div>
          <div className={`tab-page ${active === 'tab-2' ? 'active' : ''}`}>
            <h2>Results</h2>
            <p>
              Keep track of your workouts and the progress you&apos;ve made.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
