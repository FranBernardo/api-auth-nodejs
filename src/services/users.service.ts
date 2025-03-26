import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { IUser } from '../model/user.model'
import { UserRepository } from '../repositories/UserRepository'

const userRepository = new UserRepository()
export const createUser = async (user: IUser) => {
  if (!user.name || !user.email || !user.password) {
    throw new Error('Missing required fields')
  }
  const existingUser = await userRepository.find(user.email)
  if (existingUser) {
    throw new Error('User already exists')
  }
  user.password = await bcrypt.hash(user.password, 10)
  const {password, ...data} = await userRepository.create(user)

  return data
}

export const login = async (input: IUser) => {
  const user = await userRepository.find(input.email)
  if (!user) {
    throw new Error('User not found')
  }
  if (user.email !== input.email) {
    throw new Error('Invalid email')
  }
  const isPasswordValid = await bcrypt.compare(input.password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email
  },
    process.env.JWT_SECRET ||
    'secret',
    { expiresIn: '1h' })

  return token
}

export const profile = async (input:IUser) => {
  const user = await userRepository.find(input.email)
  if (!user) {
    throw new Error('User not found')
  }
  const {password, ...userData} = user
  return userData
}

export const update = async (input:IUser) => {
  const user = await userRepository.find(input.email)
  if (!user) {
    throw new Error
  }
  const updateData = await userRepository.update(user._id, input)
  return updateData
}