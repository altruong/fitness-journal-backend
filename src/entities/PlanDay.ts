import { Field } from 'type-graphql';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exercise } from './Exercise';
import { Plan } from './Plan';

@Entity()
export class PlanDay {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Plan, (plan) => (plan as any).plan_day)
  plan: Plan;

  @ManyToMany(() => Exercise)
  @JoinTable({ name: 'plan_day_exercise' })
  exericse: Exercise[];

  @Field()
  day: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
