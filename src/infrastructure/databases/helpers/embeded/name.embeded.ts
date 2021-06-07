import { Column, Entity } from "typeorm";

@Entity()
export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}