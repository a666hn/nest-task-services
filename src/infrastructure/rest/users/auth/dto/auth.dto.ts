import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignUpDto {
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