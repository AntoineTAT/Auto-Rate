import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    HttpStatus,
    UseGuards,
    Req
  } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StripeService } from 'src/stripe/stripe.service';

@Controller('users')
export class UsersController {
    
    constructor(
        private readonly usersService: UsersService,
        private readonly stripeService: StripeService,
    ) {}

    @Post()
    async addUser(
        @Body('username') userUsername: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
    ) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(userPassword, salt); //Hash le password
        const stripeId = await this.stripeService.getStripeId(
        userUsername,
        userEmail,
        );

        const user = await this.usersService.insertUser(
        userUsername,
        userEmail,
        password,
        stripeId,
        );
        return {
        statusCode: HttpStatus.OK,
        message: 'user added successfully',
        data: user,
        };
    }

    @Get()
        async getAllusers() {
        const users = await this.usersService.getUsers();
        return users;
  }
}
