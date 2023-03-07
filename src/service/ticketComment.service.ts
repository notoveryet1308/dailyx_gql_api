import { ContextType } from '../type/context';
import { ApolloError } from 'apollo-server';
import {
  CreateTicketCommentInput,
  TicketCommentIdInput,
  TicketCommentModel,
  UpdateTicketCommentInput
} from '../schema/ticketComment.schema';
import { UserModel } from '../schema/user.schema';

class TicketCommentService {
  async createTicket(input: CreateTicketCommentInput, context: ContextType) {
    try {
      const user = context.user;
      if (user?._id) {
        const updatedUserData = await UserModel.findById(user._id);
        const newTicketComment = await TicketCommentModel.create({
          ...input,
          owner: updatedUserData
        });

        return newTicketComment;
      } else {
        throw new ApolloError('User does not exists!!');
      }
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  async updateTicket(input: UpdateTicketCommentInput, context: ContextType) {
    try {
      const user = context.user;
      if (user?._id) {
        let targetTicketComment = await TicketCommentModel.findOne({
          id: input.id
        });

        if (targetTicketComment && targetTicketComment.owner._id !== user._id) {
          throw new ApolloError('You can not update this message');
        }

        let updatedicketComment = await TicketCommentModel.findOneAndUpdate(
          {
            id: input.id
          },
          { ...input }
        );
        updatedicketComment = await TicketCommentModel.findOne({
          id: input.id
        });
        return updatedicketComment;
      } else {
        throw new ApolloError('User does not exists!!');
      }
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  async deleteTicket(input: TicketCommentIdInput, context: ContextType) {
    try {
      const user = context.user;
      if (user?._id) {
        let targetTicketComment = await TicketCommentModel.findOne({
          id: input.id
        });

        if (targetTicketComment && targetTicketComment.owner._id !== user._id) {
          throw new ApolloError('You can not delete this message');
        }
        let deletedComment = await TicketCommentModel.deleteOne({
          id: input.id
        });

        return !!deletedComment.deletedCount;
      } else {
        throw new ApolloError('User does not exists!!');
      }
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}

export default TicketCommentService;
