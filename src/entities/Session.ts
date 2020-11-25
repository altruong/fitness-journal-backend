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
export class Session extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  program_id: number;

  @ManyToOne(() => Program, (program) => (program as any).session)
  program: Program;

  @Field()
  @Column()
  date: Date;

  @ManyToMany(() => Exercise, (exercise) => (exercise as any).session, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'session_exercise' })
  exercise: Exercise[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
