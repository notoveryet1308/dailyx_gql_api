import NoteResolver from './note.resolver';
import TagResolver from './tag.resolver';
import TodoResolver from './todo.resolver';
import LinkPreviewDataResolver from './bookmark.resolver'
import { UserResolver } from './user.resolver';
import ProjectResolver from './project.resolver';




export const resolvers = [TodoResolver, UserResolver, NoteResolver, TagResolver, LinkPreviewDataResolver, ProjectResolver] as const;
