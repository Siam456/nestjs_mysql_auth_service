/* eslint-disable prettier/prettier */
import { HttpException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserServices } from 'src/user-module/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserServices,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getUserByNameOrEmail(username);
      if (user) {
        const checkPass = await bcrypt.compare(password, user.password);
        if (checkPass) {
          return user;
        }
        return null;
      }
      return null;
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      const user: any = req.user;
      const payload = {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
      };
      const access_token = this.jwtService.sign(payload);

      res.cookie('siam_app', access_token, {
        httpOnly: true,
        maxAge: 86400000,
        signed: true,
      });
      res.locals.loogedInUser = payload;
      res.status(200).json({
        msg: 'Login Successfully',
        access_token: this.jwtService.sign(payload),
      });
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }
}
