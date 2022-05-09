/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { UserServices } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @Get()
  async getUsers(): Promise<any> {
    return this.userServices.getUsers();
  }
}
