import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import { Role } from '../roles/role.enum';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User')
        private readonly UserModel: Model<User>,
    ) {}

    //Insert User
    async insertUser(
        username: string,
        email: string,
        password: string,
        stripeId: string,
        ) {
    const user = await this.findByEmail(email);
    console.log('Find user before register', user);
    if (user) {
      return 'Username already exist !';
    } else {

      const newUser = new this.UserModel({
        username,
        email,
        password,
        invoices: [],
        roles: 'client',
        stripeId,
      });
      const result = await newUser.save();
      console.log(result);
      return result;
    }
  }

    //Fonction FIND one user => username
    async findOne(username: string): Promise<User | undefined> {
      const user = await this.UserModel.find({ username: username });
      console.log(user);
      if (user.length > 0) {
        return user[0];
      }
    }

    //Fonction FIND one user => email
    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.UserModel.find({ email: email });
        console.log('user service findOneMail ' + user);
        if (user.length > 0) {
          return user[0];
        }
    }

    //Fonction GET all users
    async getUsers() {
        const users = await this.UserModel.find().exec();
        return users.map((User) => ({
        id: User.id,
        username: User.username,
        email: User.email,
        //mailConfirmed: User.mailConfirmed,
        password: User.password,
        stripeId: User.stripeId,
        }));
    }

    async getSingleUser(UserId: string) {
      const User = await this.findUser(UserId);
      return {
        id: User.id,
        username: User.username,
        email: User.email,
        password: User.password,
        stripeId: User.stripeId,
      };
    }

    private async findUser(id: string): Promise<User> {
      let User;
      try {
        User = await this.UserModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException('Could not find User.');
      }
      if (!User) {
        throw new NotFoundException('Could not find User.');
      }
      return User;
    }

    async updateUser(
      UserId: string,
      username: string,
      email: string,
      password: string,
      invoices: any,
      role: Role,
      stripeId: string,
      advert: any,
      pricing: any
    ) {
      const updatedUser = await this.findUser(UserId);
      if (username) {
        updatedUser.username = username;
      }
      if (email) {
        updatedUser.email = email;
      }
      if (password) {
        updatedUser.password = password;
      }
      if (invoices) {
        updatedUser.invoices.push(invoices);
      }
      if (role) {
        updatedUser.roles = role;
      }
      if (stripeId) {
        updatedUser.stripeId = stripeId;
      }
      if (advert) {
        updatedUser.advert.push(advert);
      }
      if (pricing) {
        updatedUser.pricing.push(pricing)
      }
      updatedUser.save();
      return updatedUser;
    }

    //Fonction DELETE user => id
  async deleteUser(UserId: string) {
    const result = await this.UserModel.deleteOne({ _id: UserId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find User.');
    }
    return true;
  }
}
