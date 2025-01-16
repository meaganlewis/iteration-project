import '../styles/history.css';

const Legend = () => (
  <div className='legend'>
    {/* 0 tasks completed / score */}
    <div className='legend-item'>
      <div className='legend-circle legend-circle-0'/>
      <span className='legend-text'>0 Habits Completed</span>
    </div>

    {/* 1 task completed / score */}
    <div className='legend-item'>
      <div className='legend-circle legend-circle-1'/>
      <span className='legend-text'>1 Habit Completed</span>
    </div>

    {/* 2 tasks completed / score */}
    <div className='legend-item'>
      <div className='legend-circle legend-circle-2'/>
      <span className='legend-text'>2 Habits Completed</span>
    </div>

    {/* 3 tasks completed / score */}
    <div className='legend-item'>
      <div className='legend-circle legend-circle-3'/>
      <span className='legend-text'>3 Habits Completed</span>
    </div>

    {/* 4 tasks completed / score */}
    <div className='legend-item'>
      <div className='legend-circle legend-circle-4'/>
      <span className='legend-text'>4 Habits Completed</span>
    </div>
  </div>
);

export default Legend;
