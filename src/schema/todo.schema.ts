import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';

@ObjectType()
export class Todo {

  readonly _id: string;

  @Field(() => ID)
  @prop()
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

  @Field(() => Number, { nullable: true })
  @prop({ default: Date.now() })
  updatedOn: number;

  @Field(() => Boolean)
  @prop({ default: false })
  isCompleted: boolean;

  @Field(() => String)
  @prop({required: true})
  userId: string
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

  @Field(() => Number, { nullable: true })
  @prop()
  updatedOn: number;
}

@InputType()
export class DeleteTodoInput{
  @Field(() => String)
  id: string;
}