import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "src/infrastructure/databases/repositories/users.repository";
import { UsersService } from "./user.service";
import { UsersController } from "./users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule {}