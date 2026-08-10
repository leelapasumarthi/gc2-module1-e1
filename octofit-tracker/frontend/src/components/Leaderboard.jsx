import React, { useEffect, useState } from 'react'
import { fetchApi, getApiBaseUrl } from '../api.js'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApi('leaderboard')
      .then(setEntries)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>API base URL: {getApiBaseUrl()}</p>
      {error && <p className="error">{error}</p>}
      <ol>
        {entries.map((entry) => (
          <li key={entry._id}>
            {entry.user?.name || 'Unknown'} - {entry.totalPoints} pts ({entry.team?.name})
          </li>
        ))}
      </ol>
    </section>
  )
}
