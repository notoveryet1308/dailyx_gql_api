import { Request, Response } from 'express';
import { User } from '../schema/user.schema';

export interface ContextType {
  req: Request;
  res: Response;
  user: User;
}
