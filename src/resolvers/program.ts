import { isAuth } from '../middleware/isAuth';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Program } from '../entities/Program';
import { MyContext } from '../types/graphql-utils';

@Resolver(Program)
export class ProgramResolver {
  @Mutation(() => Program)
  @UseMiddleware(isAuth)
  async createProgram(
    @Arg('title') title: string,
    @Ctx() { req }: MyContext
  ): Promise<Program> {
    return Program.create({
      title,
      user: req.session.userId,
      start_date: new Date(Date.now()).toISOString(),
    }).save();
  }
}
