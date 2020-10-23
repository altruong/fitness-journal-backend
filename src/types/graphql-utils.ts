import { Request, Response } from 'express';
import { RedisClient } from 'redis';

export type MyContext = {
  redis: RedisClient;
  // Need sessions with res include express session props
  req: Request & { session: Express.Session; sessionID: string };
  res: Response;
  //userLoader: ReturnType<typeof userLoader>;
};
