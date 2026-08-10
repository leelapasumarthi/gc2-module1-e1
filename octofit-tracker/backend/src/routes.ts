import express from 'express'
import {
  UserModel,
  TeamModel,
  ActivityModel,
  WorkoutModel,
  LeaderboardModel
} from './models'

const router = express.Router()

router.get('/users', async (req, res) => {
  const users = await UserModel.find().populate('team', 'name city')
  res.json({data: users})
})

router.get('/teams', async (req, res) => {
  const teams = await TeamModel.find().populate('members', 'name email role')
  res.json({data: teams})
})

router.get('/activities', async (req, res) => {
  const activities = await ActivityModel.find().populate('user', 'name email')
  res.json({data: activities})
})

router.get('/leaderboard', async (req, res) => {
  const leaderboard = await LeaderboardModel.find()
    .populate('user', 'name email')
    .populate('team', 'name city')
    .sort({rank: 1})
  res.json({data: leaderboard})
})

router.get('/workouts', async (req, res) => {
  const workouts = await WorkoutModel.find()
  res.json({data: workouts})
})

export default router
