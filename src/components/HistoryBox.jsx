import styles from '../styles/HistoryStyles'; // Import styles from HistoryStyles.js

const HistoryBox = ({ day, date, onEdit, onDelete, circleColor, ratio }) => {
  return (
    <div style={styles.box}>
      <div style={styles.circlesContainer}>
        <div
          style={{
            ...styles.circle,
            backgroundColor: circleColor,
          }}
        ></div>
      </div>
      <div style={styles.content}>
        <p style={styles.day}>{day}</p>
        <p style={styles.date}>{date}</p>
      </div>
      <div style={styles.ratio}>
        <p>{ratio}</p>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={onEdit}>
          Edit
        </button>
        <button style={styles.button} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default HistoryBox;
