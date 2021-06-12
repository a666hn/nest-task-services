import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersEntity } from "src/infrastructure/databases/repositories/entities/users.entity";
import { UsersRepository } from "src/infrastructure/databases/repositories/users.repository";
import { IJwtPayload } from "src/infrastructure/rest/users/auth/interfaces/user-payload.interface";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private uRepository: UsersRepository
  ) {
    super({ secretOrKey: 'super-secret', ignoreExpiration: false, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
  }

  async validate(payload: IJwtPayload): Promise<UsersEntity> {
    const { uid } = payload
    const user: UsersEntity = await this.uRepository.findOne({ where: { id: uid } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}