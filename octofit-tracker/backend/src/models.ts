import mongoose, { Schema, Document, model } from 'mongoose'

export interface User extends Document {
  name: string
  email: string
  role: 'athlete' | 'coach'
  team: mongoose.Types.ObjectId
  joinedAt: Date
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['athlete', 'coach'], default: 'athlete' },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  joinedAt: { type: Date, default: () => new Date() }
})

export interface Team extends Document {
  name: string
  city: string
  members: mongoose.Types.ObjectId[]
}

const teamSchema = new Schema<Team>({
  name: { type: String, required: true },
  city: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

export interface Activity extends Document {
  user: mongoose.Types.ObjectId
  type: string
  durationMinutes: number
  caloriesBurned: number
  date: Date
}

const activitySchema = new Schema<Activity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true }
})

export interface Workout extends Document {
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  durationMinutes: number
}

const workoutSchema = new Schema<Workout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true }
})

export interface LeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId
  team: mongoose.Types.ObjectId
  totalPoints: number
  rank: number
}

const leaderboardSchema = new Schema<LeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  totalPoints: { type: Number, required: true },
  rank: { type: Number, required: true }
})

export const UserModel = model<User>('User', userSchema)
export const TeamModel = model<Team>('Team', teamSchema)
export const ActivityModel = model<Activity>('Activity', activitySchema)
export const WorkoutModel = model<Workout>('Workout', workoutSchema)
export const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema)
