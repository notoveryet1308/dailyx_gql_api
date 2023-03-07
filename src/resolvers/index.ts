import NoteResolver from './note.resolver';
import TagResolver from './tag.resolver';
import TodoResolver from './todo.resolver';
import LinkPreviewDataResolver from './bookmark.resolver';
import { UserResolver } from './user.resolver';
import ProjectResolver from './project.resolver';
import TicketCommentResolver from './ticketComment.resolver';
import TicketResolver from './ticket.resolver';

export const resolvers = [
  TodoResolver,
  UserResolver,
  NoteResolver,
  TagResolver,
  LinkPreviewDataResolver,
  ProjectResolver,
  TicketCommentResolver,
  TicketResolver
] as const;
