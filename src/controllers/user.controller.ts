import { Request, Response } from 'express'
import { UserService } from '../services'
export const register = async (req: Request, res: Response) => {
  try {
  const user = req.body
  const newUser = await UserService.createUser(user)
  res.status(200).json({
    newUser
  })
} catch(error: any)  {
  res.status(400).json({
    error: error.message
  })
}
}
export const login = async (req: Request, res: Response) => {
  const body = req.body
  try {
 const user = await UserService.login(body)
  res.status(200).json({
    user
  })
}catch(error: any)  {
  res.status(400).json({
    error: error.message
  })
}
}