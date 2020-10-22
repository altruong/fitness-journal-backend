import { Session } from 'inspector';
import { RedisClient } from 'redis';
import { Request, Response } from 'express';

export type MyContext = {
  redis: RedisClient;
  url: string;
  session: Session;
  req: Request;
  res: Response;
  //userLoader: ReturnType<typeof userLoader>;
};
