/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { User } from 'src/entity/user.entity';
import { Uploader } from 'src/util/uploader';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserServices } from './user.service';
import { Express } from 'express';

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

  @UseInterceptors(FileInterceptor('file', Uploader))
  @Post()
  @UsePipes(ValidationPipe)
  async addUser(
    @Body() body: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<any> {
    return this.userServices.addUser(body, avatar);
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
