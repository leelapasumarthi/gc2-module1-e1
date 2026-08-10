import React, { useEffect, useState } from 'react'
import { fetchApi, getApiBaseUrl } from '../api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApi('activities')
      .then(setActivities)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      <p>API base URL: {getApiBaseUrl()}</p>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity: any) => (
          <li key={activity._id}>
            {activity.type} by {activity.user?.name || 'Unknown'} -{' '}
            {activity.durationMinutes} min, {activity.caloriesBurned} cal
          </li>
        ))}
      </ul>
    </section>
  )
}
