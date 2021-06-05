import { IsEnum, IsNotEmpty } from 'class-validator';
import { TASK_STATUS } from 'src/globals/constant/constant';
import { ETaskStatus } from '../interface/tasks.interface';

export class FilterTaskDto {
  @IsNotEmpty()
  search: string;

  @IsEnum(ETaskStatus, { message: `The status must be one of "${Object.keys(TASK_STATUS).join(', ')}"` })
  status: ETaskStatus;
}