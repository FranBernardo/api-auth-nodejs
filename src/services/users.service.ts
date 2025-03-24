import User from '../model/user.model'


export const createUser = async (user: any) => {
  const newUser = new User(user)
  await newUser.save()
  return newUser
}

export const getUser = async () => {
  const user = await User.find()
  console.log({user})
  return user
}
