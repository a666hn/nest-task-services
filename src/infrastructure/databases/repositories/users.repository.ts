import { NotFoundException } from "@nestjs/common";
import { UsersDto } from "src/infrastructure/rest/users/dto/users.dto";
import { getTypeormError, setPassword } from "src/utils/utils";
import { EntityRepository, Repository } from "typeorm";
import { UsersEntity } from "./entities/users.entity";

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  async createNewUser(uDto: UsersDto, status: boolean): Promise<UsersEntity> {
    const { firstName, lastName, nickname, email, username, dateOfBirth, password } = uDto

    try {
      const pass = await setPassword(password);

      const user = this.create({ firstName, lastName, nickname, email, username, dateOfBirth, password: pass, isActive: status });

      await this.save(user);

      return user;
    } catch(error) {
      getTypeormError(error.code, error.message);
    }
  }

  async getUserProfile(id: string, withStatus: boolean): Promise<UsersEntity> {
    const user = await this.findOne(id);

    if (!withStatus) {
      if (!user || !user.isActive) {
        throw new NotFoundException(`User not found or maybe has been inactive`);
      }
    }

    return user;
  }

  async updateStatusUser(user: UsersEntity, status: boolean): Promise<string> {
    user.isActive = status;

    console.log("User Entity:", status);

    await this.save(user)

    return user.id;
  }
}