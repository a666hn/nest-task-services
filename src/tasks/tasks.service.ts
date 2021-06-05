import { Injectable, NotFoundException } from '@nestjs/common';
import { ETaskStatus } from './interface/tasks.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './repository/task.repository';
import { TaskEntity } from 'src/entity/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTasks(fTaskDto: FilterTaskDto): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(fTaskDto);
  }

  // Get Task By IDs
  async getTaskById(id: string): Promise<TaskEntity> {
    const t = await this.taskRepository.findOne(id);

    if (!t) {
      throw new NotFoundException(`Task with ID "${id}" is not exist!`);
    }
    
    return t;
  }

  // Create New Task
  async createNewTask(cTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(cTaskDto);
  }

  // Delete Task
  async deleteTask(id: string): Promise<void> {
    const response = await this.taskRepository.delete(id);

    if (response.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" is not exist`);
    }
  }

  // Update Task
  async updateTask(id: string, status: ETaskStatus): Promise<TaskEntity> {
    const t = await this.getTaskById(id);

    return this.taskRepository.updateTask(t, status);
  }
}
