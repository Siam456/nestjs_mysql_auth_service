/* eslint-disable prettier/prettier */

import { UserRole } from 'src/services/authorization/usaer.role';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'email',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'phone',
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: string;
}
