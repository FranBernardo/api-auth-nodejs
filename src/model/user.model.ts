import mongoose, { Schema, Document } from 'mongoose'


export interface IUser extends Document {

  _id: string
  name: string
  email: string
  password: string
}

const userSchema: Schema<IUser>= new Schema<IUser>({
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
    required: true,
}
})

const User = mongoose.model('users', userSchema, 'user_data') 

export default User