import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { ETaskStatus, ITaskData } from './interface/tasks.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterTaskDto: FilterTaskDto
  ): ITaskData[] {
    if (Object.keys(filterTaskDto).length) {
      return this.taskService.getTasksWithFilter(filterTaskDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): ITaskData {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createNewTask(
    @Body() taskDto: CreateTaskDto,
  ): ITaskData {
    return this.taskService.createNewTask(taskDto);
  }

  @Patch('/:id/progress')
  updateTaskToOnProgress(@Param('id') id: string): ITaskData {
    return this.taskService.updateTask(id, ETaskStatus.ON_PROGRESS);
  }

  @Patch('/:id/done')
  updateTaskToFinish(@Param('id') id: string): ITaskData {
    return this.taskService.updateTask(id, ETaskStatus.DONE);
  }

  @Delete('/:id/delete')
  deletingTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
