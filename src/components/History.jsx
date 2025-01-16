import { useState, useEffect } from 'react';
import HistoryBox from './HistoryBox';
import Legend from './Legend';
import '../styles/history.css';

const History = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    async function fetchHabits() {
      try {
        const response = await fetch('http://localhost:3000/api/habits', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch habits');
        }
        const data = await response.json();
        setHabits(data.habits);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    }

    fetchHabits();
  }, []);

  // Scoring helpers
  function calculateScore(habitDoc) {
    let score = 0;
    if (habitDoc.water.value > 0) score++;
    if (habitDoc.exercise.value > 0) score++;
    if (habitDoc.sleep.value > 0) score++;
    if (habitDoc.meditation.value > 0) score++;
    return score; // 0..4
  }

  function mapScoreToColor(score) {
    switch (score) {
      case 0:
        return '#FFB3B3'; // Pastel Red
      case 1:
        return '#FFD1B3'; // Pastel Orange
      case 2:
        return '#FFFFB3'; // Pastel Yellow
      case 3:
        return '#B3FFFF'; // Pastel Aqua
      case 4:
        return '#B3FFB3'; // Pastel Green
      default:
        return '#ddd';
    }
  }

  const handleDelete = async (habitId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/habits/${habitId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete habit');
      }
      setHabits((prev) => prev.filter((habit) => habit._id !== habitId));
    } catch (err) {
      console.error('Error deleting habit:', err);
    }
  };

  const handleEdit = (habitId) => {
    console.log(`Edit button clicked for habitId: ${habitId}`);
  };

  return (
    <div className='h-container'>
      <Legend />

      <div className='history-container'>
        {habits.length === 0 ? (
          <p>No habit history found. Start logging your habits!</p>
        ) : (
          habits.map((habit) => {
            const createdAt = new Date(habit.createdAt);
            const dateString = createdAt.toLocaleDateString();
            const dayOfWeek = createdAt.toLocaleDateString('en-US', {
              weekday: 'long',
            });

            // Calculate user "score" for that day & get pastel color
            const score = calculateScore(habit.habits);
            const circleColor = mapScoreToColor(score);

            // Build ratio string for each habit
            const ratio = `
              Water: ${habit.habits.water.value}${habit.habits.water.unit},
              Exercise: ${habit.habits.exercise.value}${habit.habits.exercise.unit},
              Sleep: ${habit.habits.sleep.value}${habit.habits.sleep.unit},
              Meditation: ${habit.habits.meditation.value}${habit.habits.meditation.unit}
            `;

            return (
              <HistoryBox
                key={habit._id}
                day={dayOfWeek}
                date={dateString}
                circleColor={circleColor}
                ratio={ratio}
                onEdit={() => handleEdit(habit._id)}
                onDelete={() => handleDelete(habit._id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default History;
