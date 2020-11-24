import { DayPlan } from 'src/entities/DayPlan';
import { Exercise } from '../entities/Exercise';
import { isAuth } from '../middleware/isAuth';
import { Mutation, UseMiddleware, Arg, Int, Resolver } from 'type-graphql';

@Resolver(DayPlan)
export class DayPlanResolver {
  @Mutation(() => DayPlan)
  @UseMiddleware(isAuth)
  async createDayPlan(
    @Arg('programId', () => Int) programId: number
  ): Promise<DayPlan> {
    return DayPlan.create({
      program: programId as any,
      day: 1,
    }).save();
  }

  @Mutation (() => Exercise)
  @UseMiddleware(isAuth)
  async addExercise(
    @Arg('dayplanId', () => Int) dayplanId: number): Promise<Exercise> {
      
    }
  )
}
