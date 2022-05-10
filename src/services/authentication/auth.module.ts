/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user-module/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './util/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './util/constant';
import { JwtStrategy } from './util/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
