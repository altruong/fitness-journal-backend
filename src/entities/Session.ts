import { Field } from 'type-graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from './Exercise';
import { Program } from './Program';

@Entity()
export class Session {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Program, (program) => (program as any).session)
  program: Program;

  @Field()
  @Column()
  date: Date;

  @ManyToMany(() => Exercise)
  @JoinTable({ name: 'session_exercise' })
  exercise: Exercise[];
}
