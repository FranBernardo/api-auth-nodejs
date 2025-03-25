import User, { IUser } from '../model/user.model'


export class UserRepository {
  async create(user: IUser): Promise<IUser> {
    return await User.create(user);
  }

  async find(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  
}