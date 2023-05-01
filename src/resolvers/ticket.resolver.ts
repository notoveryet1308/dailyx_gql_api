import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import {
  CreateTicketInput,
  Ticket,
  UpdateTicketInput,
  GetTicketByIdInput
} from '../schema/ticket.schema';
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

  @Mutation(() => Ticket)
  updateTicket(
    @Arg('input') input: UpdateTicketInput,
    @Ctx() context: ContextType
  ) {
    return this.ticketService.updateTicket(input, context);
  }

  @Query(() => Ticket, { nullable: true })
  getTicketById(
    @Arg('input') input: GetTicketByIdInput,
    @Ctx() context: ContextType
  ) {
    return this.ticketService.getTicketById(input, context);
  }

  @Query(() => [Ticket])
  getAllTickets(@Ctx() context: ContextType) {
    return this.ticketService.getAllTickets(context);
  }
}

export default TicketResolver;
