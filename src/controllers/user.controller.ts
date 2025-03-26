import { Request, Response } from 'express'
import { UserService } from '../services'
import { CustomRequest } from '../model/req.model'
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
 const token = await UserService.login(body)
  res.status(200).json({
    token
  })
}catch(error: any)  {
  res.status(400).json({
    error: error.message
  })
}
}

export const profile = async (req: CustomRequest, res: Response) => {
  const {user} = req
  try {
 const token = await UserService.profile(user)
  res.status(200).json({
    token
  })
}catch(error: any)  {
  res.status(400).json({
    error: error.message
  })
}
}

export const update = async (req: Request, res: Response) => {
  const body = req.body
  try {
 const token = await UserService.update(body)
  res.status(200).json({
    token
  })
}catch(error: any)  {
  res.status(400).json({
    error: error.message
  })
}
}