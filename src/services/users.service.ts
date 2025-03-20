import User from '../model/user.model'


export const createUser = async (user: any) => {
  const newUser = user
  return newUser
}

export const getUser = async () => {
  const user = await User.find()
  console.log({user})
  return user
}
