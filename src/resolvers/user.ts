import argon2 from 'argon2';
import { MyContext } from '../types/graphql-utils';
import { validateEmail } from '../utils/validateEmail';
import { validatePassword } from '../utils/validatePassword';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';
import { PG_ERROR } from '../constants';

// Additional Fields for login/register submission
@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class SubmissionResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  // Me query
  @Query(() => User)
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
    let error = validateEmail(email);
    if (error) {
      return { error };
    }
    error = validatePassword(password);
    if (error) {
      return { error };
    }

    const hashedPassword = await argon2.hash(password);

    // Send request to postgres DB
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
      if (err.code == PG_ERROR.UNIQUE_VIOLATION) {
        return {
          error: {
            field: 'email',
            message: 'email is already taken',
          },
        };
      }
    }

    // Set the userId in the session context
    req.session.userId = user.id;
    return { user };
  }

  // Login Mutation
  @Mutation(() => SubmissionResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<SubmissionResponse> {
    // Verify if email exists
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return {
        error: {
          field: 'email',
          message: "that username doesn't exist",
        },
      };
    }
    // Verify if password is correct
    const isPassValid = await argon2.verify(user.password, password);
    if (!isPassValid) {
      return {
        error: {
          field: 'password',
          message: 'password is incorrect',
        },
      };
    }
    // Set the userId in the session context
    req.session.userId = user.id;
    return { user };
  }

  // Logout Mutation
}
