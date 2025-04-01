import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { authenticator } from 'otplib'
import qrcode from 'qrcode'
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
  const { password, ...data } = await userRepository.create(user)

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

  const acessToken = jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email
  },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' })

  const payload = jwt.verify(acessToken, process.env.JWT_SECRET || 'secret')

  let isRegistered = false
  if (user.otp?.isRegistered) {
    isRegistered = true
  }
  return { acessToken, isRegistered, payload }
}
export const registerOtp = async (input: any) => {
  const user = await userRepository.find(input.email)
  if (!user) {
    throw new Error('User not found')
  }
  if (user.email !== input.email) {
    throw new Error('Invalid email')
  }
  if (!user.otp) {
    user.otp = {
      isRegistered: false,
      secret: ''
    }
  }

  const secret = authenticator.generateSecret()
  const otp = authenticator.keyuri(user.email, 'My_App_Auth', secret)

  const imagem = await qrcode.toDataURL(otp)

  user.otp.isRegistered = true
  user.otp.secret = secret
  await userRepository.update(user._id, user)

  const isRegistered = true
  return { imagem, isRegistered }
}

export const confirmOtp = async (input: IUser, code: string) => {
  const user = await userRepository.find(input.email)
  if (!user) {
    throw new Error('User not found')
  }
  if (!user.otp) {
    throw new Error('User not registered')
  }
  const isOtpValid = authenticator.verify({
    token: code,
    secret: user.otp?.secret || ''
  })
  if (!isOtpValid) {
    throw new Error('Invalid OTP')
  }
  const token = jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email
  },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' })

  return { token }
}

export const verifyOtp = async (input: IUser, code: string) => {
  const user = await userRepository.find(input.email)
  if (!user) {
    throw new Error('User not found')
  }

  const isOtpValid = authenticator.verify({
    token: code,
    secret: user.otp?.secret || ''
  })

  if (!isOtpValid) {
    throw new Error('Invalid OTP')
  }
  const token = jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email
  },
    process.env.JWT_SECRET ||
    'secret',
    { expiresIn: '1h' })
  return { token }
}



export const profile = async (input: IUser) => {
  const user = await userRepository.find(input.email)
  if (!user) {
    throw new Error('User not found')
  }
  const { password, ...userData } = user
  return userData
}

export const update = async (input: IUser) => {
  const user = await userRepository.find(input.email)
  if (!user) {
    throw new Error
  }
  const updateData = await userRepository.update(user._id, input)
  return updateData
}