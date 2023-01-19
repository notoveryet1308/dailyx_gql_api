import { Request, Response } from 'express';
import { Note } from '../schema/note.schema';
import { Todo } from '../schema/todo.schema';
import { User } from '../schema/user.schema';


export interface ContextType {
  req: Request;
  res: Response;
  user: User | null;
  todo: Todo;
  note: Note;
}
