import { IID } from 'src/app.interface';

export interface ITaskData extends IID {
  title: string;
  description: string;
  status: ETaskStatus;
}

export enum ETaskStatus {
  OPEN = 'OPEN',
  ON_PROGRESS = 'ON_PROGRESS',
  DONE = 'DONE',
}
