import { MyContext } from '../types/graphql-utils';
import { MiddlewareFn } from 'type-graphql';

// MiddlewareFn Special type from from typegraphql
// Runs before resolver

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('not authenticated');
  }
  return next();
};
