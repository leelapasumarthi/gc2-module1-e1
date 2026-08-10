import React, { useEffect, useState } from 'react'
import { fetchApi, getApiBaseUrl } from '../api.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  const endpoint = `${getApiBaseUrl()}/users`

  useEffect(() => {
    fetchApi(endpoint)
      .then(setUsers)
      .catch((err) => setError(err.message))
  }, [endpoint])

  return (
    <section>
      <h2>Users</h2>
      <p>API base URL: {getApiBaseUrl()}</p>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.role}) - {user.email}
          </li>
        ))}
      </ul>
    </section>
  )
}
