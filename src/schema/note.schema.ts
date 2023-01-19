import { Field, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';

@ObjectType()
export class Note {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop()
  id: string;

  @Field(() => String, { nullable: true })
  @prop()
  title: string;
  
  @Field(() => String)
  @prop()
  description: string;

  @Field(() => Number, { nullable: true })
  @prop({ default: Date.now() })
  createdOn: number;

  @Field(() => Number, { nullable: true })
  @prop({ default: Date.now() })
  updatedOn: number;

  @Field(()=> String)
  @prop({required: true})
  userId: string;

  @Field(()=> Boolean)
  @prop({default: false})
  isPinned: string;

  @Field(()=> [String], {nullable: true})
  @prop()
  tags: [string]
  
}


@InputType()
export class CreateNoteInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  title: string;
  
  @Field(() => String)
  description: string;

  @Field(() => Number, { nullable: true })
  createdOn: number;

  @Field(() => Number, { nullable: true })
  updatedOn: number;

  @Field(()=> String)
  userId: string;

  @Field(()=> Boolean)
  isPinned: string;

  @Field(()=> [String],{nullable: true})
  tags: [string]
}

export const NoteModel = getModelForClass(Note);