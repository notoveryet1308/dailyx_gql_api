import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { User } from './user.schema';

@ObjectType()
export class TicketComment {
  readonly _id: string;

  @Field(() => ID)
  @prop()
  id: string;

  @Field(() => String)
  @prop()
  description: string;

  @Field(() => User)
  @prop()
  owner: User;

  @Field(() => String)
  @prop()
  ticketId: string;

  @Field(() => [String], { nullable: true })
  @prop()
  reaction: [string];
}

@InputType()
export class CreateTicketCommentInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  ticketId: string;

  @Field(() => [String], { nullable: true })
  reaction: [string];
}

@InputType()
export class UpdateTicketCommentInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => [String], { nullable: true })
  reaction: [string];
}

@InputType()
export class TicketCommentIdInput {
  @Field(() => ID)
  id: string;
}

export const TicketCommentModel = getModelForClass(TicketComment);
