import express from 'express'
import mongoose from 'mongoose'
import apiRouter from './routes'

const app = express()
app.use(express.json())

const PORT = Number(process.env.PORT || 8000)
const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const MONGO_PORT = process.env.MONGO_PORT || '27017'
const DB_NAME = process.env.DB_NAME || 'octofit_db'
const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`

const CODESPACE_NAME = process.env.CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

app.use('/api', apiRouter)

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    port: PORT,
    apiBaseUrl: API_BASE_URL,
    mongoUri: MONGO_URI
  })
})

async function start() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB', MONGO_URI)
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
