import { Body, ClassSerializerInterceptor, Controller, HttpCode, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_SIGN_UP_ENDPOINT, AUTH_URL_ENDPOINT, AUTH_SIGN_IN_ENDPOINT } from "src/globals/constant/url-v1.constant";
import { GetUser } from "src/globals/decorators/user.decorator";
import { UsersEntity } from "src/infrastructure/databases/repositories/entities/users.entity";
import { UsersDto } from "../scoped-user.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth.dto";
import { IUserPayload } from "./interfaces/user-payload.interface";

@Controller(AUTH_URL_ENDPOINT)
export class AuthController {
  constructor(private aService: AuthService) {}

  @Post('/' + AUTH_SIGN_UP_ENDPOINT)
  @UseInterceptors(ClassSerializerInterceptor) // Use this for hide some entity attribute
  signUp(@Body() uDto: UsersDto): Promise<UsersEntity> {
    return this.aService.signUp(uDto, true);
  }

  @Post('/' + AUTH_SIGN_IN_ENDPOINT)
  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor) // Use this for hide some entity attribute
  signIn(@Body() uDto: SignInDto): Promise<IUserPayload<UsersEntity>> {
    return this.aService.signIn(uDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(
    @GetUser('status') status: boolean,
    @GetUser('id') id: string
  ) {
    console.log('user alealeale', id, status);
  }
}