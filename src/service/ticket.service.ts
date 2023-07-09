import {
  CreateTicketInput,
  TicketModel,
  UpdateTextFieldTicketInput,
  UpdateDropdownTicketInputs,
  GetTicketByIdInput
} from '../schema/ticket.schema';
import { ContextType } from '../type/context';
import { ApolloError } from 'apollo-server';
import { UserModel } from '../schema/user.schema';
import { ProjectModel } from '../schema/project.schema';
import { TicketCommentModel } from '../schema/ticketComment.schema';

class TicketService {
  async createTicket(input: CreateTicketInput, context: ContextType) {
    try {
      const user = context.user;
      if (user?._id) {
        const updatedUserData = await UserModel.findById(user._id);
        const project = await ProjectModel.findOne({ id: input.projectId });
        const allTickets = await TicketModel.find({
          projectId: input.projectId
        });
        const currentTicketCount = allTickets.length + 1;

        if (!project) {
          throw new ApolloError(`Invalid project id: ${input.projectId}`);
        }
        let userAssigned = await UserModel.findOne({ _id: input.assigneeId });

        const newTicket = await TicketModel.create({
          ...input,
          reporter: updatedUserData,
          ticketKey: `${project.projectKey}-${currentTicketCount}`,
          ticketNumber: currentTicketCount,
          assignee: userAssigned
        });
        return newTicket;
      } else {
        throw new ApolloError('User does not exists!!');
      }
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async updateTextFiledTicket(
    input: UpdateTextFieldTicketInput,
    context: ContextType
  ) {
    try {
      const user = context.user;
      if (user?._id) {
        const updatedUserData = await UserModel.findById(user._id);
        let targetTicket = await TicketModel.findOneAndUpdate(
          { id: input.id },
          { ...input, lastUpdatedBy: updatedUserData }
        );

        targetTicket = await TicketModel.findOne({ id: input.id });
        return targetTicket;
      }
    } catch (error) {}
  }

  async updateDropdownFiledTicket(
    input: UpdateDropdownTicketInputs,
    context: ContextType
  ) {
    try {
      const user = context.user;
      if (user?._id) {
        let assignee = {};
        let targetTicket;
        if (input.assigneeId) {
          assignee = await UserModel.findById(input.assigneeId);
          targetTicket = await TicketModel.findOneAndUpdate(
            { id: input.id },
            { assignee }
          );
        }

        if (input.priority || input.status) {
          targetTicket = await TicketModel.findOneAndUpdate(
            { id: input.id },
            { ...input }
          );
        }

        targetTicket = await TicketModel.findOne({ id: input.id });
        return targetTicket;
      }
    } catch (error) {}
  }

  async getTicketById(input: GetTicketByIdInput, context: ContextType) {
    try {
      const user = context.user;
      if (user?._id) {
        const targetTicket = await TicketModel.findOne({
          ticketKey: input.ticketKey
        });
        const project = await ProjectModel.findOne({
          id: targetTicket.projectId
        });

        if (
          project.owner.teamMember.includes(user.email) ||
          project.owner._id.valueOf() === user._id
        ) {
          return targetTicket;
        }

        throw new ApolloError('You do not have access to this page');
      } else {
        throw new ApolloError('User does not exists!!');
      }
    } catch (error) {}
  }

  async getAllTickets(context: ContextType) {
    const user = context.user;
    try {
      const updatedUserData = await UserModel.findById(user._id);
      const allTickets = await TicketModel.find({});

      let authorizedTicket = [];
      if (allTickets.length) {
        authorizedTicket = allTickets.filter((data) => {
          if (data.reporter.email === updatedUserData.email) {
            return data;
          } else if (data.reporter.teamMember.includes(updatedUserData.email)) {
            return data;
          }
        });
      }

      return authorizedTicket;
    } catch (error) {
      throw new ApolloError('User does not exists!!');
    }
  }
}

export default TicketService;
