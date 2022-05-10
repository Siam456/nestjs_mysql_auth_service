/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsPhoneNumber('BN')
  phone: string;

  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsPhoneNumber('BN')
  phone: string;
}
