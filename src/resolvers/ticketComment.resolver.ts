import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import {
  TicketComment,
  CreateTicketCommentInput,
  UpdateTicketCommentInput,
  TicketCommentIdInput
} from '../schema/ticketComment.schema';
import TicketCommentService from '../service/ticketComment.service';
import { ContextType } from '../type/context';

@Resolver()
class TicketCommentResolver {
  constructor(private ticketCommentService: TicketCommentService) {
    this.ticketCommentService = new TicketCommentService();
  }

  @Mutation(() => TicketComment)
  createTicketComment(
    @Arg('input') input: CreateTicketCommentInput,
    @Ctx() context: ContextType
  ) {
    return this.ticketCommentService.createTicket(input, context);
  }

  @Mutation(() => TicketComment)
  updateTicketComment(
    @Arg('input') input: UpdateTicketCommentInput,
    @Ctx() context: ContextType
  ) {
    return this.ticketCommentService.updateTicket(input, context);
  }

  @Mutation(() => Boolean)
  deleteTicketComment(
    @Arg('input') input: TicketCommentIdInput,
    @Ctx() context: ContextType
  ) {
    return this.ticketCommentService.deleteTicket(input, context);
  }
}

export default TicketCommentResolver;
