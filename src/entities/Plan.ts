import { Field, Int } from 'type-graphql';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Program } from './Program';

@Entity()
export class Plan {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Program, (program) => (program as any).plan)
  program: Program;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
