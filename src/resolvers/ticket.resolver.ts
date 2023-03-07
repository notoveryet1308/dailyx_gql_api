import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import { CreateTicketInput, Ticket } from '../schema/ticket.schema';
import TicketService from '../service/ticket.service';
import { ContextType } from '../type/context';

@Resolver()
class TicketResolver {
  constructor(private ticketService: TicketService) {
    this.ticketService = new TicketService();
  }

  @Mutation(() => Ticket)
  createTicket(
    @Arg('input') input: CreateTicketInput,
    @Ctx() context: ContextType
  ) {
    return this.ticketService.createTicket(input, context);
  }
}

export default TicketResolver;
