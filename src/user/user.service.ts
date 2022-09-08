import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserById(id: string) {
    return await this.userModel.findById<User>(id).exec();
  }
  async getUserByEmail(email: string) {
    return await this.userModel.findOne<User>({ email: email }).exec();
  }
  async create(user: User) {
    return await this.userModel.create(user);
  }
}
