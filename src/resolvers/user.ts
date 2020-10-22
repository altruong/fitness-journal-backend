import { MyContext } from 'src/types/graphql-utils';
import { Ctx, Resolver } from 'type-graphql';
import { User } from '../entities/User';

@Resolver(User)
export class UserResolver {
  // Me resolver
  me(@Ctx() { req }: MyContext) {}

  // Register
  // Login
  // Logout
}
