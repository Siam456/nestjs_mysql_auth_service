/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserServices } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userServices.getUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userServices.getUser(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async addUser(@Body() body: CreateUserDto): Promise<any> {
    return this.userServices.addUser(body);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string): Promise<any> {
    return this.userServices.removeUser(id);
  }

  @Put('/:id')
  async updateUser(
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<any> {
    return this.userServices.updateUser(body, id);
  }
}
