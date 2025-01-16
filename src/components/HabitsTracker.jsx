import { NavLink, Outlet } from 'react-router-dom';
import '../styles/habits.css';

export default function HabitsTracker() {
  return (
    <div className='container'>
      <div className='tabs'>
        {/* Use NavLink so we can style the "active" tab automatically */}
        <NavLink
          to='/habits'
          end
          className={({ isActive }) =>
            isActive ? 'tab-button active' : 'tab-button'
          }
        >
          Healthy Habits
        </NavLink>

        <NavLink
          to='/habits/history'
          className={({ isActive }) =>
            isActive ? 'tab-button active' : 'tab-button'
          }
        >
          History
        </NavLink>
      </div>

      {/* Renders whichever child route is active (UserEntries or History) */}
      <div className='tabs-content'>
        <Outlet />
      </div>
    </div>
  );
}
