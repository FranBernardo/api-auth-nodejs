import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from '../model/req.model'

export const validateAuth  = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('authorization')?.split(/bearer\s*/i)[1]
  if (!token) {
    res.status(403).json({ message: 'Token is missing' })
    return
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.user = decoded

    next()

  } catch (error) {
    res.status(403).json({ message: 'Invalid token' })
  }
}

