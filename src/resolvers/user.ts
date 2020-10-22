import { MyContext } from 'src/types/graphql-utils';
import { Arg, Ctx, Field, ObjectType, Resolver } from 'type-graphql';
import { User } from '../entities/User';

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
// Additional Fields
@ObjectType()
class SubmissionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

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
  login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<SubmissionResponse> {
    return;
  }

  // Logout Mutation
}
