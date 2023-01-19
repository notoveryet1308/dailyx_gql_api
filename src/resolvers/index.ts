import NoteResolver from './note.resolver';
import TodoResolver from './todo.resolver';
import { UserResolver } from './user.resolver';


export const resolvers = [TodoResolver, UserResolver, NoteResolver] as const;
