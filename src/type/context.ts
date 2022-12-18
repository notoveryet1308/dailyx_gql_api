import { Request, Response } from 'express';
import { Todo } from '../schema/todo.schema';
import { User } from '../schema/user.schema';

export interface ContextType {
  req: Request;
  res: Response;
  user: User;
  todo: Todo
}
