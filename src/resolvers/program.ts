import { Arg, Mutation, Resolver } from 'type-graphql';
import { Program } from '../entities/Program';

@Resolver(Program)
export class ProgramResolver {
  @Mutation(() => Program)
  async createProgram(@Arg('title') title: string): Promise<Program> {
    return Program.create({ title }).save();
  }
}
