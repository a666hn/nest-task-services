import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Query, UseInterceptors } from "@nestjs/common";
import { USER_AUTH_ENDPOINT, USER_GET_PROFILE_ENDPOINT, USER_UPDATE_STATUS_ENDPOINT } from "src/globals/constant/url-v1.constant";
import { UsersEntity } from "src/infrastructure/databases/repositories/entities/users.entity";
import { FilterGetUserDto } from '../scoped-user.dto';
import { ProfileService } from "./profile.service";

@Controller(USER_AUTH_ENDPOINT)
export class ProfileController {
  constructor(private pService: ProfileService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor) // Use this for hide some entity attribute
  getUsers(@Query() f: FilterGetUserDto): Promise<UsersEntity[]> {
    return this.pService.getUsers(f);
  }

  @Get('/:id/' + USER_GET_PROFILE_ENDPOINT)
  @UseInterceptors(ClassSerializerInterceptor) // Use this for hide some entity attribute
  getUserProfile(@Param('id') id: string): Promise<UsersEntity> {
    return this.pService.getUserProfile(id);
  }

  @Patch('/:id/' + USER_UPDATE_STATUS_ENDPOINT)
  updateStatusUser(@Param('id') id: string, @Body('status') status: boolean): Promise<string> {
    return this.pService.updateStatusUser(id, status);
  }
}