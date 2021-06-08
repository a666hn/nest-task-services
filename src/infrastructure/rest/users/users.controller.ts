import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { UsersEntity } from "src/infrastructure/databases/repositories/entities/users.entity";
import { UsersDto } from "./dto/users.dto";
import { UsersService } from "./user.service";

@Controller('users')
export class UsersController {
  constructor(private uService: UsersService) {}

  @Post('/sign-up')
  @UseInterceptors(ClassSerializerInterceptor) // Use this for hide some entity attribute
  signUp(@Body() uDto: UsersDto): Promise<UsersEntity> {
    return this.uService.signUp(uDto, true);
  }

  @Get('/:id/profile')
  @UseInterceptors(ClassSerializerInterceptor) // Use this for hide some entity attribute
  getUserProfile(@Param('id') id: string): Promise<UsersEntity> {
    return this.uService.getUserProfile(id);
  }

  @Patch('/:id/update-status')
  updateStatusUser(@Param('id') id: string, @Body('status') status: boolean): Promise<string> {
    return this.uService.updateStatusUser(id, status);
  }
}