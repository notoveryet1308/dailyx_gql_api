import { Mutation, Resolver , Arg, Ctx, Query} from "type-graphql";
import { Tag, CreateTagInput } from "../schema/tag.schema";
import TagService from "../service/tag.service";
import { ContextType } from '../type/context';

@Resolver()
export default class TagResolver {
    constructor(private tagService: TagService){
        this.tagService = new TagService()
    }

    @Mutation(()=> Tag)
    createTag(@Arg('input') input: CreateTagInput, @Ctx() context: ContextType){
       return this.tagService.createTag(input, context)
    }

    @Query(()=> [Tag])
    getTag(@Ctx() context: ContextType){
      return this.tagService.getTag(context)
    }
}