import { Injectable } from '@nestjs/common';
import { ETaskStatus, ITaskData } from './interface/tasks.interface';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITaskData[] = [];

  getAllTasks(): ITaskData[] {
    return this.tasks
  }

  getTaskById(id: string): ITaskData {
    const task = this.tasks.filter((t) => t.id === id)[0];
    return task
  }

  createNewTask(taskDto: CreateTaskDto): ITaskData {
    const { title, description } = taskDto

    const task: ITaskData = {
      id: uuid(),
      title,
      description,
      status: ETaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, status: ETaskStatus): ITaskData {
    const task = this.getTaskById(id);

    task.status = status;

    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
