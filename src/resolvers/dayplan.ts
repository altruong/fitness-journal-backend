import { Arg, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { DayPlan } from '../entities/DayPlan';
import { isAuth } from '../middleware/isAuth';

@Resolver(DayPlan)
export class DayPlanResolver {
  @Mutation(() => DayPlan)
  @UseMiddleware(isAuth)
  async createDayPlan(
    @Arg('programId', () => Int) programId: number,
    @Arg('day', () => Int) day: number
  ): Promise<DayPlan> {
    return DayPlan.create({
      program_id: programId as any,
      day: day,
    }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addExerciseToDayPlan(
    @Arg('dayPlanId', () => Int) dayPlanId: number,
    @Arg('exerciseId', () => Int) exerciseId: number
  ): Promise<Boolean> {
    await getConnection().query(
      `
      insert into day_plan_exercise
      (exercise_id, day_plan_id)
      values
      (${exerciseId}, ${dayPlanId})
      `
    );
    return true;
  }
}
