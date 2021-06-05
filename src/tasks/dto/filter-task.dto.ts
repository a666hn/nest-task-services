import { ETaskStatus } from '../interface/tasks.interface';

export class FilterTaskDto {
  search: string;
  status: ETaskStatus;
}