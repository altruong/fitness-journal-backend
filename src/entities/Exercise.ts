import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExerciseType } from './ExerciseType';

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  exercise_type_id!: number;

  @ManyToOne(
    () => ExerciseType,
    (exercise_type) => (exercise_type as any).exercise
  )
  exercise_type: ExerciseType;

  @Field()
  @Column()
  reps: number;

  @Field()
  @Column()
  sets: number;

  @Field()
  @Column()
  intensity: number;

  @Field()
  @Column()
  order: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', default: null })
  notes: string | null;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
