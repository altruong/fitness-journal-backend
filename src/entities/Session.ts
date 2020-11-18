import { Entity, Column } from 'typeorm';
import { Exercise } from './Exercise';

@Entity()
export class Session extends Exercise {
  @Column()
  date: Date;
}
