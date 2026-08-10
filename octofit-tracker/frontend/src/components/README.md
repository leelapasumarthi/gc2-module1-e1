This folder contains React components for the OctoFit Tracker frontend.

Each component fetches data from the backend using the API base URL configured by
`VITE_CODESPACE_NAME` in `.env.local`.

API endpoint format:
  https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/

If `VITE_CODESPACE_NAME` is not defined, the frontend safely falls back to localhost:
  http://localhost:8000/api/[component]/
