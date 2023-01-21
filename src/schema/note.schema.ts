import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Tag, CreateTagInput } from './tag.schema';


@ObjectType()
export class Note {

  readonly _id: string;

  @Field(() => ID)
  @prop()
  id: string;

  @Field(()  => String, { nullable: true })
  @prop()
  title: string;
  
  @Field(()  => String)
  @prop()
  description: string;

  @Field(()  => Number, { nullable: true })
  @prop({ default: Date.now() })
  createdOn: number;

  @Field(()  => Number, { nullable: true })
  @prop({ default: Date.now() })
  updatedOn: number;

  @Field(() => String)
  @prop({required: true})
  userId: string;

  @Field(() => Boolean, {nullable: true})
  @prop({default: false})
  isPinned: string;

  @Field(() => [Tag],{defaultValue:[]})
  @prop()
  tags: Tag[]

  @Field(() => String)
  @prop({required: true})
  hexCode: string;

  
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


  @Field(()=> [CreateTagInput],{nullable: true})
  tags: CreateTagInput[];

  @Field(()=> String)
  hexCode: string;

}

@InputType()
export class DeleteNoteInput {
  @Field(() => String)
  id: string;
}

export const NoteModel = getModelForClass(Note);