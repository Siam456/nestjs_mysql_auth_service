/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { STATUS_CODES } from 'http';

import { unlink } from 'fs';
import * as path from 'path';

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

  async getUserByNameOrEmail(searchKey: string): Promise<any> {
    return await this.userRepository.findOne({
      where: [{ name: searchKey }, { email: searchKey }],
    });
  }

  async addUser(user: CreateUserDto, avatar: any): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(user.password, salt);
      if (avatar) {
        return await this.userRepository.save({
          ...user,
          password: hashPass,
          avatar: avatar.filename,
        });
      }
      return await this.userRepository.save({ ...user, password: hashPass });
    } catch (err) {
      if (err && avatar) {
        const { filename } = avatar;
        unlink(path.join(__dirname, `/../../uploads/${filename}`), (err) => {
          if (err) console.log(err);
        });
      }
      throw new HttpException(err.message, 500);
    }
  }

  async removeUser(id: string): Promise<any> {
    try {
      const user: any = await this.userRepository.findOne(id);

      if (user) {
        if (user.avatar !== null) {
          unlink(
            path.join(__dirname, `/../../uploads/${user.avatar}`),
            (err) => {
              if (err) console.log(err);
            },
          );
        }
        return await this.userRepository.delete(id);
      } else {
        throw new NotFoundException('user not found');
      }
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
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
