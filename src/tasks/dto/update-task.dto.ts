import { ETaskStatus } from '../interface/tasks.interface';

export class UpdateTaskDto {
  public id: string;
  public status: ETaskStatus;
}