import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType, ID, InputType } from 'type-graphql';

@ObjectType()
export class Tag {
  readonly _id: string;

  @Field(() => ID)
  @prop()
  id: string;

  @Field(() => String)
  @prop()
  label: string;

  @Field(() => String)
  @prop()
  value: string;

  @Field(() => String)
  @prop()
  userId: string;
}
@InputType()
export class CreateTagInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  label: string;

  @Field(() => String)
  value: string;
}

export const TagModel = getModelForClass(Tag);
