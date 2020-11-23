import argon2 from 'argon2';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { COOKIE_NAME, PG_ERROR } from '../constants';
import { User } from '../entities/User';
import { MyContext } from '../types/graphql-utils';
import { validateEmail } from '../utils/validateEmail';
import { validatePassword } from '../utils/validatePassword';

@InputType()
class RegisterInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

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
  // @FieldResolver(() => String)
  // email(@Root() user: User, @Ctx() { req }: MyContext) {
  //   // THis is the current user and its okay to show them thier own email
  //   if (req.session.userId === user.id) {
  //     return 'Joemama';
  //   }
  //   // current user wants to see someone elses email
  //   return '';
  // }

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
    @Arg('input') input: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<SubmissionResponse> {
    const { firstName, lastName, username, email, password } = input;
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
        .values({
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          password: hashedPassword,
        })
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
    // Essentially logging them in as well
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
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      // removes session from redis
      req.session.destroy((err) => {
        if (err) {
          resolve(false);
          return;
        }
        // destroy cookie on response object
        res.clearCookie(COOKIE_NAME);
        resolve(true);
      });
    });
  }
}
