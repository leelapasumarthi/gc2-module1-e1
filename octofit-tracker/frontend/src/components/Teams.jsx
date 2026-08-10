import React, { useEffect, useState } from 'react'
import { fetchApi, getApiBaseUrl } from '../api.js'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApi('teams')
      .then(setTeams)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      <p>API base URL: {getApiBaseUrl()}</p>
      {error && <p className="error">{error}</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            <strong>{team.name}</strong> ({team.city})
            <ul>
              {team.members?.map((member) => (
                <li key={member._id}>{member.name} - {member.role}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
