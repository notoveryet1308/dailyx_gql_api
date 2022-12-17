import { Field, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';

@ObjectType()
export class Todo {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  id: string;

  @Field(() => Number, { nullable: true })
  @prop()
  duration: number;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => Number, { nullable: true })
  @prop({ default: Date.now() })
  createdOn: number;

  @Field(() => Boolean)
  @prop({ default: false })
  isCompleted: boolean;
}

export const TodoModel = getModelForClass(Todo);

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  id: string;

  @Field(() => Number, { nullable: true })
  duration: number;

  @Field(() => String)
  description: string;

  @Field(() => Number, { nullable: true })
  createdOn: number;

  @Field(() => Boolean, { nullable: true })
  isCompleted: boolean;
}
