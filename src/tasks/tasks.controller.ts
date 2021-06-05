import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskEntity } from 'src/entity/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { ETaskStatus } from './interface/tasks.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks(@Query() fTaskDto: FilterTaskDto): Promise<TaskEntity[]> {
    return this.taskService.getTasks(fTaskDto);
  }
  
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() taskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskService.createNewTask(taskDto);
  }

  @Delete('/:id/delete')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/progress')
  updateTaskToOnProgress(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.updateTask(id, ETaskStatus.ON_PROGRESS);
  }

  @Patch('/:id/done')
  updateTaskToFinish(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.updateTask(id, ETaskStatus.DONE);
  }
}
