import { Injectable, NotFoundException } from '@nestjs/common';
import { ETaskStatus, ITaskData } from './interface/tasks.interface';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITaskData[] = [];

  getAllTasks(): ITaskData[] {
    return this.tasks;
  }

  getTasksWithFilter(filterTaskDto: FilterTaskDto): ITaskData[] {
    const { status, search } = filterTaskDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    
    if (search) {
      tasks = tasks.filter(
        (task) =>
          (task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search))
            ? true : false
      );
    }

    return tasks;
  }

  getTaskById(id: string): ITaskData {
    const taskFound = this.tasks.filter((t) => t.id === id)[0];

    if (!taskFound) {
      throw new NotFoundException(`Task with ID "${id}" is not exist!`);
    }

    return taskFound;
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

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" is not exist`)
    }

    task.status = status;

    return task;
  }

  deleteTask(id: string): void {
    const task = this.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" is not exist`)
    }
    
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
