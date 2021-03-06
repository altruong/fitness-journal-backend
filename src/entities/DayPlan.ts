import { Field, Int, ObjectType } from 'type-graphql';
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

@ObjectType()
@Entity()
export class DayPlan extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  program_id: number;

  @ManyToOne(() => Program, (program) => (program as any).day_plan)
  program: Program;

  @Field(() => [Exercise], { nullable: true })
  @ManyToMany(() => Exercise, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinTable({ name: 'day_plan_exercise' })
  exercises: Exercise[];

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
