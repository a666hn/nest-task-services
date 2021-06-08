import { IsNotEmpty, IsOptional } from 'class-validator'
import { ETaskStatus } from 'src/globals/enum/enum';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class FilterTaskDto {
  @IsOptional()
  status: ETaskStatus;

  @IsOptional()
  keyword: string;
}