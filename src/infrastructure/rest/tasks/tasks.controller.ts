import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ETaskStatus } from "src/globals/enum/enum";
import { TasksEntity } from "src/infrastructure/databases/repositories/entities/tasks.entity";
import { TasksService } from 'src/infrastructure/rest/tasks/tasks.service';
import { CreateTaskDto, FilterTaskDto } from "./dto/tasks.dto";

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTasks(@Body() cTaskDto: CreateTaskDto): Promise<TasksEntity> {
    return this.taskService.createNewTask(cTaskDto);
  }

  @Get()
  getTasks(@Query() fTaskDto: FilterTaskDto): Promise<TasksEntity[]> {
    return this.taskService.getTasks(fTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<TasksEntity> {
    return this.taskService.getTaskById(id);
  }

  @Patch('/:id/progress')
  progressTasks(@Param('id') id: string): Promise<TasksEntity> {
    return this.taskService.updateTask(id, ETaskStatus.ON_PROGRESS);
  }

  @Patch('/:id/done')
  doneTasks(@Param('id') id: string): Promise<TasksEntity> {
    return this.taskService.updateTask(id, ETaskStatus.DONE);
  }

  @Delete('/:id/delete')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}