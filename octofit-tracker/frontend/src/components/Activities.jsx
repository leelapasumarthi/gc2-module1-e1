import React, { useEffect, useState } from 'react'
import { fetchApi, getApiBaseUrl } from '../api.js'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  const endpoint = `${getApiBaseUrl()}/activities`

  useEffect(() => {
    fetchApi(endpoint)
      .then(setActivities)
      .catch((err) => setError(err.message))
  }, [endpoint])

  return (
    <section>
      <h2>Activities</h2>
      <p>API base URL: {getApiBaseUrl()}</p>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            {activity.type} by {activity.user?.name || 'Unknown'} - {activity.durationMinutes} min, {activity.caloriesBurned} cal
          </li>
        ))}
      </ul>
    </section>
  )
}
