// /types/user.ts

export interface User {
  id: string
  username: string
  email: string
  fullName: string
  avatar: string
  bio?: string
  location?: string
  website?: string
  joinedAt: Date
  followers: number
  following: number
  tweets: number
  verified: boolean
  status?: 'active' | 'inactive' | 'suspended'
  points: number // ⭐ User’s total reward or reputation points
}
