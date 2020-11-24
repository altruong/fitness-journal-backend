import {
  Arg,
  Field,
  InputType,
  Mutation,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Exercise } from '../entities/Exercise';
import { isAuth } from '../middleware/isAuth';

@InputType()
class ExerciseInput {
  @Field()
  exercise_type_id: number;
  @Field()
  reps: number;
  @Field()
  sets: number;
  @Field()
  intensity: number;
  @Field(() => String, { nullable: true })
  notes: string | null;
  @Field()
  order: number;
}

@Resolver(Exercise)
export class ExerciseResolver {
  // Create Exericse Record
  @Mutation(() => Exercise)
  @UseMiddleware(isAuth)
  async createExercise(@Arg('input') input: ExerciseInput): Promise<Exercise> {
    return Exercise.create(input).save();
  }
}
