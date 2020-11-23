import { Field, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExerciseType } from './ExerciseType';

@Entity()
export class Exercise extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

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
  order: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', default: null })
  notes: string | null;
}
