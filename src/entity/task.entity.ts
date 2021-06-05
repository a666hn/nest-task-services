import { ETaskStatus } from "src/tasks/interface/tasks.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ETaskStatus;
}