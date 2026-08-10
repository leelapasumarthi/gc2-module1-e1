import React, { useEffect, useState } from 'react'
import { fetchApi, getApiBaseUrl } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApi('workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      <p>API base URL: {getApiBaseUrl()}</p>
      {error && <p className="error">{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <strong>{workout.title}</strong> — {workout.difficulty} • {workout.durationMinutes} min
            <p>{workout.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
