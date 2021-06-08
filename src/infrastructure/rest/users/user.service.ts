import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/infrastructure/databases/repositories/entities/users.entity";
import { UsersRepository } from "src/infrastructure/databases/repositories/users.repository";
import { UsersDto } from "./dto/users.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private uRepository: UsersRepository
  ) {}

  async signUp(uDto: UsersDto, status: boolean): Promise<UsersEntity> {
    return this.uRepository.createNewUser(uDto, status);
  }

  async getUserProfile(id: string): Promise<UsersEntity> {
    return this.uRepository.getUserProfile(id, false);
  }

  async updateStatusUser(id: string, status: boolean): Promise<string> {
    const user = await this.uRepository.getUserProfile(id, true);

    return this.uRepository.updateStatusUser(user, status);
  }
}