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
import { User } from './User';

@Entity()
export class Session {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  date: Date;

  @ManyToMany(() => Exercise)
  @JoinTable({ name: 'session_exercise' })
  activities: Exercise[];
}
