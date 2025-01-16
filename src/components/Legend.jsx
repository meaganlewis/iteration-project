import '../styles/history.css';

const Legend = () => (
  <div className='legend'>
    {/* 0 tasks completed / score */}
    <div className='legend-item'>
      <div className='legend-circle legend-circle-0'></div>
      <span className='legend-text'>No Habits Completed / score</span>
    </div>

    {/* 1 task completed / score */}
    <div className='legend-item'>
      <div className='legend-circle legend-circle-1'></div>
      <span className='legend-text'>1 Habit Completed / score</span>
    </div>

    {/* 2 tasks completed / score */}
    <div className='legend-item'>
      <div className='legend-circle legend-circle-2'></div>
      <span className='legend-text'>2 Habits Completed / score</span>
    </div>

    {/* 3 tasks completed / score */}
    <div className='legend-item'>
      <div className='legend-circle legend-circle-3'></div>
      <span className='legend-text'>3 Habits Completed / score</span>
    </div>

    {/* 4 tasks completed / score */}
    <div className='legend-item'>
      <div className='legend-circle legend-circle-4'></div>
      <span className='legend-text'>All Habits Completed / score</span>
    </div>
  </div>
);

export default Legend;
