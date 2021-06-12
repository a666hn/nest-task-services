import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthStrategy } from "src/globals/middleware/auth.strategy";
import { UsersRepository } from "src/infrastructure/databases/repositories/users.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([UsersRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy],
  exports: [AuthStrategy, PassportModule]
})
export class AuthModule {}