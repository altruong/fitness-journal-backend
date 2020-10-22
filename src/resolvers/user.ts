import { MyContext } from 'src/types/graphql-utils';
import { Ctx, Resolver } from 'type-graphql';
import { User } from '../entities/User';

@Resolver(User)
export class UserResolver {
  // Me query
  me(@Ctx() { req }: MyContext) {
    if (!req.session?.userId) {
      return null;
    }

    return User.findOne(req.session.userId); //returns promise of user
  }

  // Register Mutation
  // Login Mutation

  // Logout Mutation
}
