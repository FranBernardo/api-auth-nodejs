import mongoose, { Document, Schema } from 'mongoose'


export interface IUser extends Document {

  _id: string
  name: string
  email: string
  password: string
  otp?: {
    isRegistered: boolean,
    secret: string
  }
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false,
  },

  otp: {
   isRegistered: {
      type: Boolean,
      default: false
    },
    secret: {
      type: String,
      default: ''
    }
  }
})

const User = mongoose.model('users', userSchema, 'user_data')

export default User