import { Request, Response } from 'express'
import { UserService } from '../services'
export const register = async (req: Request, res: Response) => {
  const user = req.body
  const newUser = await UserService.createUser(user)
  res.status(200).json({
    newUser
  })
}

export const getUser = async (req: Request, res: Response) => {
 const user = await UserService.getUser()
  res.status(200).json({
    user
  })
}