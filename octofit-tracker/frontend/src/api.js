const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const normalizeResponse = (payload) => {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (payload.data) return payload.data
  if (payload.results) return payload.results
  return payload
}

export const getApiBaseUrl = () => API_BASE_URL
export const fetchApi = async (resource) => {
  const url = resource.startsWith('http') ? resource : `${API_BASE_URL}/${resource}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`API request failed with ${response.status}`)
  }
  const payload = await response.json()
  return normalizeResponse(payload)
}
