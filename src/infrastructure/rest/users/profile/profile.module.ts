import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "src/infrastructure/databases/repositories/users.repository";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository])
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}