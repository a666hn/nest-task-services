import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/infrastructure/databases/repositories/entities/users.entity";
import { UsersRepository } from "src/infrastructure/databases/repositories/users.repository";
import { UsersDto } from "../scoped-user.dto";
import { SignInDto } from "./dto/auth.dto";
import { IUserPayload } from "./interfaces/user-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private uRepo: UsersRepository
  ) {}

  async signUp(uDto: UsersDto, status: boolean): Promise<UsersEntity> {
    return this.uRepo.createNewUser(uDto, status);
  }

  async signIn(uDto: SignInDto): Promise<IUserPayload<UsersEntity>> {
    const userData = await this.uRepo.checkUserAndSignIn(uDto);

    const user: IUserPayload<UsersEntity> = {
      user: userData,
      token: "",
      refreshToken: ""
    }

    return user
  }
}