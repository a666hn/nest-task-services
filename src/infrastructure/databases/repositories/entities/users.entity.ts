import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ unique: true })
  email: string;
  
  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}