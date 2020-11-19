import { Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ExerciseType {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // @OneToMany(() => Exercise, (exercise) => exercise.exercise_type)
  // exercise: Exercise[];

  @Field()
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', default: null })
  type: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', default: null })
  description: string | null;
}
