import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ETaskStatus } from "src/globals/enum/enum";
import { TasksEntity } from "src/infrastructure/databases/repositories/entities/tasks.entity";
import { TasksRepository } from "src/infrastructure/databases/repositories/tasks.repository";
import { CreateTaskDto, FilterTaskDto } from "./dto/tasks.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskR: TasksRepository
  ) {}

  async createNewTask(cTaskDto: CreateTaskDto): Promise<TasksEntity> {
    return this.taskR.createTask(cTaskDto);
  }

  async getTasks(fTaskDto: FilterTaskDto): Promise<TasksEntity[]> {
    return this.taskR.getTasks(fTaskDto);
  }

  async getTaskById(id: string): Promise<TasksEntity> {
    const task = await this.taskR.findOne(id);

    if (!task) {
      throw new NotFoundException(`Can't found task with ID ${id}`);
    }

    return task
  }

  async updateTask(id: string, status: ETaskStatus): Promise<TasksEntity> {
    const task = await this.getTaskById(id);
    
    return this.taskR.updateTask(task, status);
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.taskR.delete(id);

    if (task.affected <= 0) {
      throw new NotFoundException(`Can't found task with ID ${id}`)
    }
  }
}