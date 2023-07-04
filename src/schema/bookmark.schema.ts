import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Tag, CreateTagInput } from './tag.schema';

@ObjectType()
export class Bookmark {
  readonly _id: string;

  @Field(() => ID)
  @prop()
  id: string;

  @Field(() => String, { nullable: true })
  @prop()
  ogTitle: string;

  @Field(() => String, { nullable: true })
  @prop()
  ogImg: string;

  @Field(() => String, { nullable: true })
  @prop()
  ogDescription: string;

  @Field(() => String)
  @prop()
  ogUrl: string;

  @Field(() => String, { nullable: true })
  @prop()
  ogSiteName: string;

  @Field(() => String, { nullable: true })
  @prop()
  ogIcon?: string;

  @Field(() => String, { nullable: true })
  @prop()
  ogType?: string;

  @Field(() => [Tag], { defaultValue: [] })
  @prop()
  tags: Tag[];

  @Field(() => String)
  @prop({ required: true })
  userId: string;

  @Field(() => String, { nullable: true })
  @prop()
  hexCode: string;

  @Field(() => Boolean)
  @prop({ default: false })
  isPreviewAvailable: boolean;

  @Field(() => Number)
  @prop()
  createdAt: number;

  @Field(() => Number)
  @prop()
  updatedAt: number;
}

@ObjectType()
export class GenerateLinkData {
  @Field(() => String, { nullable: true })
  ogImg?: string;

  @Field(() => String, { nullable: true })
  ogTitle?: string;

  @Field(() => String, { nullable: true })
  ogUrl?: string;

  @Field(() => String, { nullable: true })
  ogSiteName: string;

  @Field(() => String, { nullable: true })
  ogDescription?: string;

  @Field(() => String, { nullable: true })
  ogIcon?: string;

  @Field(() => String, { nullable: true })
  ogType?: string;
}

@InputType()
export class UpdateBookmarkInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  ogTitle: string;

  @Field(() => String, { nullable: true })
  ogDescription: string;

  @Field(() => String)
  ogUrl: string;

  @Field(() => String, { nullable: true })
  ogSiteName: string;

  @Field(() => String, { nullable: true })
  ogImg: string;

  @Field(() => [CreateTagInput], { nullable: true })
  tags: CreateTagInput[];

  @Field(() => String, { nullable: true })
  hexCode: string;

  @Field(() => Number)
  @prop()
  updatedAt: number;
}

@InputType()
export class GenerateLinkPreviewData {
  @Field(() => String)
  url: string;

  @Field(() => String)
  id: string;
}

@InputType()
export class DeleteBookmarkInput {
  @Field(() => String)
  id: string;
}

export const BookmarkModel = getModelForClass(Bookmark);
