import { useState } from 'react';
import '../styles/card.css';

export default function UserEntries() {
  // WATER
  const [waterValue, setWaterValue] = useState(0);
  const [waterUnit, setWaterUnit] = useState('ml'); // 'ml' or 'oz'

  // EXERCISE
  const [exerciseValue, setExerciseValue] = useState(0);
  const [exerciseUnit, setExerciseUnit] = useState('minutes'); // 'minutes' or 'hours'

  // SLEEP
  const [sleepValue, setSleepValue] = useState(0);
  const [sleepUnit, setSleepUnit] = useState('hours'); // 'minutes' or 'hours'

  // MEDITATION
  const [meditationValue, setMeditationValue] = useState(0);
  const [meditationUnit, setMeditationUnit] = useState('minutes'); // 'minutes' or 'hours'

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Build the payload for the new schema
    const payload = {
      habits: {
        water: {
          value: waterValue,
          unit: waterUnit,
        },
        exercise: {
          value: exerciseValue,
          unit: exerciseUnit,
        },
        sleep: {
          value: sleepValue,
          unit: sleepUnit,
        },
        meditation: {
          value: meditationValue,
          unit: meditationUnit,
        },
      },
    };

    console.log('Submitting data:', payload);

    try {
      // Replace /api/habits with your actual route
      const response = await fetch('http://localhost:3000/api/habits', {
        method: 'POST',
        credentials: 'include', // Needed to send JWT cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        // Reset fields if needed
        setWaterValue(0);
        setWaterUnit('ml');
        setExerciseValue(0);
        setExerciseUnit('minutes');
        setSleepValue(0);
        setSleepUnit('hours');
        setMeditationValue(0);
        setMeditationUnit('minutes');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className='entries'>
      <form onSubmit={handleSubmit}>
        {/* WATER */}
        <div className='rows'>
          <label className='inline'>
            <div className='static-box'>Water Intake</div>
          </label>
          <input
            type='number'
            value={waterValue}
            onChange={(e) => setWaterValue(Number(e.target.value))}
            placeholder='Enter amount'
            required
          />
          <label>
            <span>Units:</span>
            <select
              name='waterUnit'
              value={waterUnit}
              onChange={(e) => setWaterUnit(e.target.value)}
            >
              <option value='ml'>ml</option>
              <option value='oz'>oz</option>
            </select>
          </label>
        </div>

        {/* EXERCISE */}
        <div className='rows'>
          <label className='inline'>
            <div className='static-box'>Exercise</div>
          </label>
          <input
            type='number'
            value={exerciseValue}
            onChange={(e) => setExerciseValue(Number(e.target.value))}
            placeholder='Enter time'
            required
          />
          <label>
            <span>Units:</span>
            <select
              name='exerciseUnit'
              value={exerciseUnit}
              onChange={(e) => setExerciseUnit(e.target.value)}
            >
              <option value='minutes'>minutes</option>
              <option value='hours'>hours</option>
            </select>
          </label>
        </div>

        {/* SLEEP */}
        <div className='rows'>
          <label className='inline'>
            <div className='static-box'>Sleep</div>
          </label>
          <input
            type='number'
            value={sleepValue}
            onChange={(e) => setSleepValue(Number(e.target.value))}
            placeholder='Enter sleep'
            required
          />
          <label>
            <span>Units:</span>
            <select
              name='sleepUnit'
              value={sleepUnit}
              onChange={(e) => setSleepUnit(e.target.value)}
            >
              <option value='minutes'>minutes</option>
              <option value='hours'>hours</option>
            </select>
          </label>
        </div>

        {/* MEDITATION */}
        <div className='rows'>
          <label className='inline'>
            <div className='static-box'>Meditation</div>
          </label>
          <input
            type='number'
            value={meditationValue}
            onChange={(e) => setMeditationValue(Number(e.target.value))}
            placeholder='Enter time'
            required
          />
          <label>
            <span>Units:</span>
            <select
              name='meditationUnit'
              value={meditationUnit}
              onChange={(e) => setMeditationUnit(e.target.value)}
            >
              <option value='minutes'>minutes</option>
              <option value='hours'>hours</option>
            </select>
          </label>
        </div>

        <button className='submit' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}

