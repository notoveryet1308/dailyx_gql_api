import NoteResolver from './note.resolver';
import TagResolver from './tag.resolver';
import TodoResolver from './todo.resolver';
import LinkPreviewDataResolver from './bookmark.resolver'
import { UserResolver } from './user.resolver';



export const resolvers = [TodoResolver, UserResolver, NoteResolver, TagResolver, LinkPreviewDataResolver] as const;
