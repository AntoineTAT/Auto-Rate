import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

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
        mailConfirmed: false,
        password,
        gems: 0,
        note_user: 0,
        note_organisator: 0,
        gemsWon: 0,
        games: [],
        invoices: [],
        roles: 'organisateur',
        discordId: 'discord',
        stripeId,
        wins: 0,
        losses: 0,
        firstPurchase: false,
        googleId: 'google',
        goodies: [],
      });
      const token = Math.floor(1000 + Math.random() * 9000).toString();
      const User = newUser;
      //await this.mailService.sendUserConfirmation(User, token);
      const result = await newUser.save();
      console.log(result);
      return result;
    }
  }


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
}
