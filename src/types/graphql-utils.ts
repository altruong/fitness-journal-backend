import { Request, Response } from 'express';
import { RedisClient } from 'redis';

export type MyContext = {
  redis: RedisClient;

  req: Request;
  res: Response;
  //userLoader: ReturnType<typeof userLoader>;
};
