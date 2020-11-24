import { Arg, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
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
}
