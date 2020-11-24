import { Field, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exercise } from './Exercise';
import { Program } from './Program';

@Entity()
export class DayPlan extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Program, (program) => (program as any).plan)
  program: Program;

  @ManyToMany(() => Exercise)
  @JoinTable({ name: 'day_plan_exercise' })
  exericse: Exercise[];

  // Weekday as an integer (0-6) Sunday is 0
  @Field(() => Int)
  @Column()
  day: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
