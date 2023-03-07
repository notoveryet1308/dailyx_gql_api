import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { User } from './user.schema';
import { Ticket } from './ticket.schema';

@ObjectType()
export class Project {
  readonly _id: string;

  @Field(() => ID)
  @prop()
  id: string;

  @Field(() => String)
  @prop()
  name: string;

  @Field(() => String)
  @prop()
  description: string;

  @Field(() => User)
  @prop()
  owner: User;

  @Field(() => String)
  @prop()
  projectKey: string;

  @Field(() => [Ticket], { defaultValue: [] })
  tickets: [Ticket];
}

@InputType()
export class CreateProjectInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  projectKey: string;
}

@InputType()
export class ProjectIdInput {
  @Field(() => ID)
  id: string;
}

export const ProjectModel = getModelForClass(Project);
