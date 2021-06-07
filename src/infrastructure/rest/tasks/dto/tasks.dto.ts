import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class FilterTaskDto {
  @IsOptional()
  status: string;

  @IsOptional()
  keyword: string;
}