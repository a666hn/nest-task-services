import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UsersDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  status: boolean;
}

export class FilterGetUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}