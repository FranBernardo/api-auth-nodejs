import User, { IUser } from '../model/user.model'
import { UserRepository } from '../repositories/UserRepository'
import bcrypt from "bcrypt";

const userRepository = new UserRepository()
export const createUser = async (user: IUser) => {
  user.password = await bcrypt.hash(user.password, 10)
  const newUser = await userRepository.create(user)
  return newUser
}

export const getUser = async () => {
  const user = await User.find()
  console.log({ user })
  return user
}
