import { Field } from 'type-graphql';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Plan } from './Plan';

@Entity()
export class PlanDay {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Plan, (plan) => (plan as any).plan_day)
  plan: Plan;

  @Field()
  day: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
