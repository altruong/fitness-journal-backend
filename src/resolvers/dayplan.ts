import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { DayPlan } from '../entities/DayPlan';
import { isAuth } from '../middleware/isAuth';

@Resolver(DayPlan)
export class DayPlanResolver {
  @Query(() => [DayPlan])
  @UseMiddleware(isAuth)
  async dayPlans(
    @Arg('programId', () => Int) programId: number
  ): Promise<DayPlan[]> {
    const qb = getConnection()
      .getRepository(DayPlan)
      .createQueryBuilder('dp')
      .leftJoinAndSelect('dp.exercises', 'exercise')
      .where('dp.program_id = :programId', { programId: programId })
      .orderBy('dp.day', 'ASC');

    // Request the resource
    const dayPlans = await qb.getMany();
    console.log(dayPlans[0].exercises);
    return dayPlans;
  }

  @Mutation(() => DayPlan)
  @UseMiddleware(isAuth)
  async createDayPlan(
    @Arg('programId', () => Int) programId: number,
    @Arg('day', () => Int) day: number
  ): Promise<DayPlan> {
    // TODO: make day unique and from 0-6
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
