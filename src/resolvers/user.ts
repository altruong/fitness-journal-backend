import argon2 from 'argon2';
import { MyContext } from 'src/types/graphql-utils';
import { validateEmail } from 'src/utils/validateEmail';
import { validatePassword } from 'src/utils/validatePassword';
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

// Additional Fields for login/register submission
@ObjectType()
class SubmissionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@Resolver(User)
export class UserResolver {
  // Me query
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId); //returns promise of user
  }

  // Register Mutation
  @Mutation(() => SubmissionResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<SubmissionResponse> {
    // Validate email and password credientials
    let errors = validateEmail(email);
    if (errors) {
      return { errors };
    }
    errors = validatePassword(password);
    if (errors) {
      return { errors };
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({ email: email, password: hashedPassword })
        .returning('*') // return clause to return everything
        .execute();
      user = result.raw[0];
    } catch (err) {
      console.log(err);
    }
    // Set the userId in the context
    req.session.userId = user.id;
    return { user };
  }
  /*
  // Login Mutation
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<SubmissionResponse> {
    return;
  }*/

  // Logout Mutation
}
