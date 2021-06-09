import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { SignInDto } from "src/infrastructure/rest/users/auth/dto/auth.dto";
import { FilterGetUserDto, UsersDto } from "src/infrastructure/rest/users/scoped-user.dto";
import { HandleTypeOrmError } from "src/utils/error.util";
import { ComparePassword, SetPassword } from "src/utils/utils";
import { EntityRepository, Repository } from "typeorm";
import { UsersEntity } from "./entities/users.entity";

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  async createNewUser(uDto: UsersDto, status: boolean): Promise<UsersEntity> {
    const { firstName, lastName, nickname, email, username, dateOfBirth, password } = uDto

    try {
      const pass = await SetPassword(password);

      const user = this.create({ firstName, lastName, nickname, email, username, dateOfBirth, password: pass, isActive: status });

      await this.save(user);

      return user;
    } catch(error) {
      HandleTypeOrmError(error.code, error.message);
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

    await this.save(user)

    return user.id;
  }

  async getUsers(f: FilterGetUserDto): Promise<UsersEntity[]> {
    const { name, username, email, status } = f

    const query = this.createQueryBuilder('user');

    if (name) {
      query.andWhere(
        `user.firstName || ' ' || user.lastName ILIKE :name`,
        { name: `%${name}%` }
      );
    }

    if (username) {
      query.andWhere(
        `user.username ILIKE :username`,
        { username: `%${username}%` }
      );
    }

    if (email) {
      query.andWhere(
        `user.email ILIKE :email`,
        { email: `%${email}%` }
      );
    }

    if (status) {
      query.andWhere(
        `user.status = :status`,
        { status }
      );
    }

    try {
      const users = await query.getMany();

      return users;
    } catch (error) {
      HandleTypeOrmError(error.code, error.message);
    }
  }

  async checkUserAndSignIn(uDto: SignInDto): Promise<UsersEntity> {
    const { username, password } = uDto

    const user = await this.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User not exist in our database!`);
    }

    if (await ComparePassword(password, user.password)) {
      delete user.password;

      return user;
    }

    throw new UnauthorizedException('Incorrect password. Please check your password!');
  }
}