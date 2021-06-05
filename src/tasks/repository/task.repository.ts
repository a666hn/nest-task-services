import { TaskEntity } from "src/entity/task.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { FilterTaskDto } from "../dto/filter-task.dto";
import { ETaskStatus } from "../interface/tasks.interface";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getTasks(fTaskDto: FilterTaskDto): Promise<TaskEntity[]> {
    const { status, search } = fTaskDto;
    
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) ILIKE :search OR LOWER(task.description) ILIKE :search',
        { search: `%${search}%` }
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
  
  async createTask(cTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = cTaskDto;

    const t = this.create({ title, description, status: ETaskStatus.OPEN });

    await this.save(t);

    return t;
  }

  async updateTask(t: TaskEntity, status: ETaskStatus): Promise<TaskEntity> {
    t.status = status;

    await this.save(t);

    return t;
  }
}