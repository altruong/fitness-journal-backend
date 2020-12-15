import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { DayPlan } from '../entities/DayPlan';
import { Exercise } from '../entities/Exercise';
import { isAuth } from '../middleware/isAuth';

@Resolver(DayPlan)
export class DayPlanResolver {
  @FieldResolver(() => [Exercise])
  async exercises(@Root() dayPlan: DayPlan): Promise<Exercise[]> {
    // WRITE SQL
    const exercises = await getConnection().query(
      `
      SELECT t1.* FROM exercise t1
      LEFT JOIN day_plan_exercise t2 
      ON t1.id=t2.exercise_id
	    WHERE t2.day_plan_id=${dayPlan.id};
      `
    );
    console.log(exercises);
    return exercises;
  }

  @Query(() => [DayPlan])
  //@UseMiddleware(isAuth)
  async dayPlans(
    @Arg('programId', () => Int) programId: number
  ): Promise<DayPlan[]> {
    const qb = getConnection()
      .getRepository(DayPlan)
      .createQueryBuilder('dp')
      // .leftJoinAndSelect('dp.exercises', 'exercise');
      .where('dp.program_id = :programId', { programId: programId })
      .orderBy('dp.day', 'DESC');

    //Request the resource
    const dayPlans = await qb.getMany();
    // console.log(dayPlans[0]);
    // console.log(dayPlans);
    return dayPlans;
    // const dayPlan = getConnection().getRepository(DayPlan);
    // const res = await dayPlan.find({
    //   relations: ['exercises'],
    // });
    // console.log(res);
    // return res;
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
