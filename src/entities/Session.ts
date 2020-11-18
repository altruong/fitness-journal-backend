import { Field } from 'type-graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Activity } from './Activity';

@Entity()
export class Session {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  date: Date;

  @ManyToMany(() => Activity)
  @JoinTable({ name: 'session_exercise' })
  activities: Activity[];
}
