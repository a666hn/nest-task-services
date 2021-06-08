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
}