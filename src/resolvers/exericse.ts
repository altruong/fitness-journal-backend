import { isAuth } from "src/middleware/isAuth";
import { Arg, Field, InputType, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Exercise } from "../entities/Exercise";

@InputType()
class ExerciseInput {
  @Field()
  reps: number
  @Field()
  sets: number
  @Field()
  intensity: number
  @Field()
  notes: string | null
  @Field()
  order: number
}

@Resolver(Exercise)
export class ExerciseResolver {
  
  // Create Exericse Record
  @Mutation(() => Exercise)
  @UseMiddleware(isAuth)
  async createExercise(
    @Arg('input') input: ExerciseInput
  ): Promise<Exercise> {
    return Exercise.create(input).save();
  }