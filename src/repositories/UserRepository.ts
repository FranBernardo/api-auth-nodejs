import User, { IUser } from '../model/user.model'


export class UserRepository {
  async create(user: IUser): Promise<IUser> {
    return await User.create(user);
  }
}