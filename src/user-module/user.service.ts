/* eslint-disable prettier/prettier */
import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { STATUS_CODES } from 'http';

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getUsers(): Promise<any> {
    return await this.userRepository.find();
  }
  async getUser(id: string): Promise<any> {
    return await this.userRepository.findOne(id);
  }

  async addUser(user: CreateUserDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(user.password, salt);
      return await this.userRepository.save({ ...user, password: hashPass });
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  async removeUser(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async updateUser(updateUserInfo: UpdateUserDto, id: string): Promise<any> {
    try {
      const response = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ ...updateUserInfo })
        .where('id = :id', { id: id })
        .execute();

      if (response) {
        return {
          response,
          msg: 'update successfully',
        };
      }
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }
}
