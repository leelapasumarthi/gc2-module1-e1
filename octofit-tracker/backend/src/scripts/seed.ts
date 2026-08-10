import mongoose from 'mongoose'
import {
  UserModel,
  TeamModel,
  ActivityModel,
  WorkoutModel,
  LeaderboardModel
} from '../models'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)
    console.log('Connected to octofit_db')

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
      LeaderboardModel.deleteMany({})
    ])

    const teamAlpha = await TeamModel.create({
      name: 'OctoFit Warriors',
      city: 'San Francisco',
      members: []
    })
    const teamBeta = await TeamModel.create({
      name: 'Pacific Pulse',
      city: 'Seattle',
      members: []
    })

    const users = await UserModel.create([
      {
        name: 'Ava Turner',
        email: 'ava.turner@example.com',
        role: 'athlete',
        team: teamAlpha._id,
        joinedAt: new Date('2026-01-10')
      },
      {
        name: 'Noah Brooks',
        email: 'noah.brooks@example.com',
        role: 'athlete',
        team: teamAlpha._id,
        joinedAt: new Date('2026-02-16')
      },
      {
        name: 'Mia Clarke',
        email: 'mia.clarke@example.com',
        role: 'coach',
        team: teamBeta._id,
        joinedAt: new Date('2025-11-03')
      },
      {
        name: 'Ethan Price',
        email: 'ethan.price@example.com',
        role: 'athlete',
        team: teamBeta._id,
        joinedAt: new Date('2026-03-05')
      }
    ])

    teamAlpha.members = [users[0]._id, users[1]._id]
    teamBeta.members = [users[2]._id, users[3]._id]
    await teamAlpha.save()
    await teamBeta.save()

    await ActivityModel.create([
      {
        user: users[0]._id,
        type: 'Cycling',
        durationMinutes: 42,
        caloriesBurned: 620,
        date: new Date('2026-07-25T07:20:00Z')
      },
      {
        user: users[1]._id,
        type: 'Running',
        durationMinutes: 30,
        caloriesBurned: 390,
        date: new Date('2026-07-25T18:10:00Z')
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        durationMinutes: 55,
        caloriesBurned: 240,
        date: new Date('2026-07-24T10:00:00Z')
      },
      {
        user: users[3]._id,
        type: 'Strength',
        durationMinutes: 65,
        caloriesBurned: 540,
        date: new Date('2026-07-23T16:30:00Z')
      }
    ])

    await WorkoutModel.create([
      {
        title: 'Sunrise HIIT Blast',
        description: 'A high-energy morning routine to kickstart your metabolism.',
        difficulty: 'intermediate',
        durationMinutes: 30
      },
      {
        title: 'Core Strength Builder',
        description: 'Focused intervals for abs, obliques, and lower back.',
        difficulty: 'advanced',
        durationMinutes: 45
      },
      {
        title: 'Recovery Flow',
        description: 'Gentle movements and stretching for active recovery.',
        difficulty: 'beginner',
        durationMinutes: 25
      }
    ])

    await LeaderboardModel.create([
      {
        user: users[1]._id,
        team: teamAlpha._id,
        totalPoints: 1420,
        rank: 1
      },
      {
        user: users[0]._id,
        team: teamAlpha._id,
        totalPoints: 1365,
        rank: 2
      },
      {
        user: users[3]._id,
        team: teamBeta._id,
        totalPoints: 1280,
        rank: 3
      }
    ])

    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
