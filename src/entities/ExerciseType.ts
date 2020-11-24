import { Field, Int } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ExerciseCategory } from './ExerciseCategory';

@Entity()
export class ExerciseType {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  exercise_category_id: number;

  @ManyToOne(
    () => ExerciseCategory,
    (exercise_category) => (exercise_category as any).exercise_type
  )
  exercise_category: ExerciseCategory[];

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', default: null })
  description: string | null;
}
