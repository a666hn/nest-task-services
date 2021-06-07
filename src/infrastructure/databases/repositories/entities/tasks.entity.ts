import { ETaskStatus } from "src/globals/enum/enum";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('tasks')
export class TasksEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ETaskStatus;
}