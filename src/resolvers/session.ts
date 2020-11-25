import { Arg, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Session } from '../entities/Session';
import { isAuth } from '../middleware/isAuth';

@Resolver(Session)
export class SessionResolver {
  @Mutation(() => Session)
  @UseMiddleware(isAuth)
  async createSession(
    @Arg('programId', () => Int) programId: number
  ): Promise<Session> {
    return Session.create({
      program_id: programId,
      date: new Date(Date.now()).toISOString(),
    }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addExerciseToSession(
    @Arg('sessionId', () => Int) sessionId: number,
    @Arg('exerciseId', () => Int) exerciseId: number
  ): Promise<Boolean> {
    await getConnection().query(
      `
      insert into session_exercise
      (exercise_id, session_id)
      values
      (${exerciseId}, ${sessionId})
      `
    );
    return true;
  }
}
