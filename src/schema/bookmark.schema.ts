import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Tag, CreateTagInput } from './tag.schema';

@ObjectType()
export class Bookmark {

    readonly _id: string;

    @Field(() => ID)
    @prop()
    id: string;
  
    @Field(()  => String, { nullable: true })
    @prop()
    ogTitle: string;

    @Field(() => String, { nullable: true })
    @prop()
    ogImg: string;

    @Field(()  => String, { nullable: true })
    @prop()
    ogDescription: string;
    
    @Field(()=> String)
    @prop()
    ogUrl: string;
    
    @Field(()=> String)
    @prop()
    ogSiteName: string;

    @Field(() => [Tag],{defaultValue:[]})
    @prop()
    tags: Tag[];

    @Field(() => String)
    @prop({required: true})
    userId: string;

    @Field(() => String)
    @prop({required: true})
    hexCode: string;
}

@ObjectType()
export class GenerateLinkData {
 
  @Field(() => String)
  ogImg?: string;

  @Field(() => String)
  ogTitle?: string;

  @Field(() => String)
  ogUrl?: string;

  @Field(() => String)
  ogSiteName: string;

  @Field(() => String)
  ogDescription?: string;
  
}

@InputType()
export class CreateBookmarkInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  ogTitle: string;
  
  @Field(() => String, { nullable: true })
  ogDescription: string;
  
  @Field(() => String)
  ogUrl: string;

  @Field(() => String)
  ogSiteName: string;

  @Field(() => String, { nullable: true })
  ogImg: string;

  @Field(()=> [CreateTagInput],{nullable: true})
  tags: CreateTagInput[];

  @Field(()=> String)
  hexCode: string;

}

@InputType()
export class GenerateLinkPreviewData {
  @Field(()=> String)
  url: string;
}

@InputType()
export class DeleteBookmarkInput {
  @Field(() => String)
  id: string;
}

export const BookmarkModel = getModelForClass(Bookmark);