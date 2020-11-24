import { Arg, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { DayPlan } from '../entities/DayPlan';
import { isAuth } from '../middleware/isAuth';

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

  // @Mutation(() => Exercise)
  // @UseMiddleware(isAuth)
  // async addExercise();
}
