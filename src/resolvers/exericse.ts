import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
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

  // Update exercise fields
  @Mutation(() => Exercise, { nullable: true })
  @UseMiddleware(isAuth)
  async updateExercise(
    @Arg('exerciseId', () => Int) exerciseId: number,
    @Arg('input') input: ExerciseInput
  ): Promise<Exercise | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Exercise)
      .set(input)
      .where('id = :exerciseId', { exerciseId })
      .execute();
    //console.log(result);
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteExercise(
    @Arg('exerciseId', () => Int) exerciseId: number
  ): Promise<Boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Exercise)
      .where('id = :exerciseId', { exerciseId })
      .execute();

    // If delete is successful, affected != 0
    return result.affected !== 0 ? true : false;
  }
}
