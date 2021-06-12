import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/infrastructure/databases/repositories/entities/users.entity";
import { UsersRepository } from "src/infrastructure/databases/repositories/users.repository";
import { UsersDto } from "../scoped-user.dto";
import { SignInDto } from "./dto/auth.dto";
import { IJwtPayload, IUserPayload } from "./interfaces/user-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private uRepo: UsersRepository,
    private jwtService: JwtService
  ) {}

  async signUp(uDto: UsersDto, status: boolean): Promise<UsersEntity> {
    return this.uRepo.createNewUser(uDto, status);
  }

  async signIn(uDto: SignInDto): Promise<IUserPayload<UsersEntity>> {
    const [userData, isAuthenticated] = await this.uRepo.checkUserAndSignIn(uDto);

    if (!isAuthenticated) {
      throw new UnauthorizedException('Incorrect password!')
    }

    const payload: IJwtPayload = {
      uid: userData.id,
      un: userData.username,
      ue: userData.email,
      us: userData.isActive
    }

    const token: string = this.jwtService.sign(payload);

    const user: IUserPayload<UsersEntity> = {
      user: userData,
      token: token,
      refreshToken: ""
    }

    return user
  }
}