import User, { IUser } from '../model/user.model'
import { UserRepository } from '../repositories/UserRepository'
import bcrypt from "bcrypt";

const userRepository = new UserRepository()
export const createUser = async (user: IUser) => {
  if(!user.name || !user.email || !user.password) {
    throw new Error('Missing required fields')
  }
  const existingUser = await userRepository.find(user.email)
  if(existingUser) {
   throw new Error('User already exists')
  }
  user.password = await bcrypt.hash(user.password, 10)
  const newUser = await userRepository.create(user)
  return newUser
}

export const login = async (input: IUser) => {
  const user = await userRepository.find(input.email)
  if(!user) {
    throw new Error('User not found')
  }
  const isPasswordValid = await bcrypt.compare(user.password, user.password)
  if(!isPasswordValid) {
    throw new Error('Invalid password')
  }
  return user
}
