import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/infrastructure/databases/repositories/entities/users.entity";
import { UsersRepository } from "src/infrastructure/databases/repositories/users.repository";
import { FilterGetUser } from "../scoped-user.dto";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UsersRepository)
    private uRepo: UsersRepository
  ) {}

  async getUserProfile(id: string): Promise<UsersEntity> {
    return this.uRepo.getUserProfile(id, false);
  }

  async updateStatusUser(id: string, status: boolean): Promise<string> {
    const user = await this.uRepo.getUserProfile(id, true);

    return this.uRepo.updateStatusUser(user, status);
  }

  async getUsers(f: FilterGetUser): Promise<UsersEntity[]> {
    return this.uRepo.getUsers(f);
  }
}