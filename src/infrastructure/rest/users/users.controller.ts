import { Body, Controller, Post } from "@nestjs/common";
import { UsersEntity } from "src/infrastructure/databases/repositories/entities/users.entity";
import { UsersDto } from "./dto/users.dto";
import { UsersService } from "./user.service";

@Controller('users')
export class UsersController {
  constructor(private uService: UsersService) {}

  @Post('/sign-up')
  signUp(@Body() uDto: UsersDto): Promise<UsersEntity> {
    return this.uService.signUp(uDto, true);
  }
}