import PropTypes from 'prop-types';
import '../styles/history.css';

const HistoryBox = ({ day, date, onEdit, onDelete, circleColor, ratio }) => {
  return (
    <div className='box'>
      <div className='circles-container'>
        {/* Circle with dynamic color if you wish, 
            or pick a .legend-circle-N class if you prefer a static approach */}
        <div className='circle' style={{ backgroundColor: circleColor }} />
      </div>

      <div className='content'>
        <div className='top-row'>
          {/* Show the date or day — your choice */}
          <p className='day'>{day}</p>
          <p className='date'>{date}</p>
        </div>
        <p className='ratio'>{ratio}</p>
      </div>

      <div className='button-container'>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};
//
// Prop types validation
HistoryBox.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  circleColor: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
};

export default HistoryBox;
