import { AfterInsert, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;

  @AfterInsert()
  timeInserted() {
    this.createdAt = new Date();
  }

  @AfterUpdate()
  timeUpdated() {
    this.updatedAt = new Date();
  }
}