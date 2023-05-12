import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Tag, CreateTagInput } from './tag.schema';
import { User } from './user.schema';
import { Project } from './project.schema';
import { TicketComment } from './ticketComment.schema';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@ObjectType()
export class Ticket {
  readonly _id: string;

  @Field(() => ID)
  @prop()
  id: string;

  @Field(() => String)
  @prop()
  summary: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  @prop()
  description: string;

  @Field(() => User)
  @prop()
  reporter: User;

  @Field(() => String)
  @prop()
  projectId: string;

  @Field(() => Boolean)
  @prop()
  isDraft: boolean;

  @Field(() => User, { defaultValue: 'UNASSIGNED' })
  @prop()
  assignee: User;

  @Field(() => [Number, Number], { nullable: true })
  @prop()
  sprintDate: [Number, Number];

  @Field(() => String)
  @prop()
  issueType: string;

  @Field(() => Number)
  @prop()
  created: Number;

  @Field(() => Number)
  @prop()
  updated: Number;

  @Field(() => [Tag], { defaultValue: [] })
  @prop()
  tags: Tag[];

  @Field(() => String)
  @prop()
  priority: string;

  @Field(() => Number)
  @prop()
  ticketNumber: number;

  @Field(() => String)
  @prop()
  status: string;

  @Field(() => String)
  @prop()
  ticketKey: string;

  @Field(() => User, { nullable: true })
  @prop()
  lastUpdatedBy: User;

  @Field(() => Project)
  project: Project;

  @Field(() => [TicketComment], { defaultValue: [] })
  comments: [TicketComment];
}

// @InputType()
// export class CreateTicketAssigneeInput {
//   @Field(() => ID)
//   _id: string;

//   @IsEmail()
//   @Field(() => String)
//   email: string;

//   @Field(() => String)
//   name: string;

//   @Field(() => String, { nullable: true })
//   profession: string;

//   @Field(() => String, { nullable: true })
//   avatar: string;

//   @Field(() => [String], { defaultValue: [] })
//   teamMember: [string];
// }

@InputType()
export class CreateTicketInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  summary: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  projectId: string;

  @Field(() => Boolean)
  isDraft: boolean;

  @Field(() => String, { nullable: true })
  assigneeId: String;

  @Field(() => [Number, Number], { nullable: true })
  sprintDate: [Number, Number];

  @Field(() => String)
  issueType: string;

  @Field(() => Number)
  created: Number;

  @Field(() => Number)
  updated: Number;

  // @Field(() => [CreateTagInput], { nullable: true })
  // tags: CreateTagInput[];

  @Field(() => String)
  priority: string;

  @Field(() => String)
  status: string;
}

@InputType()
export class UpdateTicketInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  summary: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  assigneeId: String;

  // @Field(() => [Number, Number], { nullable: true })
  // sprintDate: [Number, Number];

  @Field(() => Number)
  updated: Number;

  // @Field(() => [CreateTagInput], { nullable: true })
  // tags: CreateTagInput[];

  @Field(() => String)
  priority: string;

  @Field(() => String)
  status: string;
}

@InputType()
export class DeleteTicketInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class GetTicketByIdInput {
  @Field(() => String)
  id: string;
}

export const TicketModel = getModelForClass(Ticket);
