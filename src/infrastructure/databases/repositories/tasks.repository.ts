import { ETaskStatus } from 'src/globals/enum/enum';
import { CreateTaskDto, FilterTaskDto } from 'src/infrastructure/rest/tasks/dto/tasks.dto';
import { EntityRepository, Repository } from 'typeorm';
import { TasksEntity } from './entities/tasks.entity';


@EntityRepository(TasksEntity)
export class TasksRepository extends Repository<TasksEntity> {
  // Query create new single task
  /**
   * 
   * @param cTaskDto CreateTaskDto
   * @returns Promise - TasksEntity
   */
  async createTask(cTaskDto: CreateTaskDto): Promise<TasksEntity> {
    const { title, description } = cTaskDto;

    const task = this.create({ title, description, status: ETaskStatus.OPEN });

    await this.save(task);

    return task;
  }

  /**
   * Get all tasks or by filtering
   * 
   * @param status string - Filter by ON_PROGRESS, OPEN, DONE
   * @param keyword string - Filter by title or description
   */
  async getTasks(fTaskDto: FilterTaskDto): Promise<TasksEntity[]> {
    const { keyword, status } = fTaskDto
    
    const query = this.createQueryBuilder('task');

    if (status !== '') {
      query.andWhere('task.status = :status', { status });
    }

    if (keyword !== '') {
      query.andWhere(
        'LOWER(task.title) ILIKE :keyword OR LOWER(task.description) ILIKE :keyword',
        { keyword: `%${keyword}%` }
      );
    }

    const tasks = query.getMany();

    return tasks;
  }

  /**
   * 
   * @param task TasksEntity
   * @param status Base on Enum status tasks (ETaskStatus)
   * @returns Promise<TasksEntity> Return the Task Entity
   */
  async updateTask(task: TasksEntity, status: ETaskStatus): Promise<TasksEntity> {
    task.status = status;

    await this.save(task);

    return task;
  }
}