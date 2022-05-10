/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constant';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req.signedCookies) {
            const cookie =
              Object.keys(req.signedCookies).length > 0 ? req.signedCookies : 0;
            if (cookie) {
              const token = cookie['siam_app'];
              return token;
            }
            return null;
          }
          return null;
        },
      ]),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
