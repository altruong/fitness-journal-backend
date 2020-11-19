import { Field } from 'type-graphql';
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
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Program, (program) => (program as any).plan)
  program: Program;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
