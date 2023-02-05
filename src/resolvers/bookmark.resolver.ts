import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';

import LinkPreviewDataService from '../service/linkPreviewData.service';
import {Bookmark, CreateBookmarkInput, DeleteBookmarkInput, GenerateLinkPreviewData, GenerateLinkData} from '../schema/bookmark.schema'
import { ContextType } from '../type/context';

@Resolver()
export default class LinkPreviewDataResolver {

  constructor(private linkPreviewDataService: LinkPreviewDataService) {
    this.linkPreviewDataService = new LinkPreviewDataService();
  }

    @Mutation(() => Bookmark)
    createBookmark(@Arg('input') input: CreateBookmarkInput, @Ctx() context: ContextType) {
      return this.linkPreviewDataService.createLinkPreviewData(input, context);
    }
    
    @Mutation(()=> GenerateLinkData)
    generatePreviewData(@Arg('input') input: GenerateLinkPreviewData){
        return this.linkPreviewDataService.generateLinkPreviewData(input)
    }

    @Query(() => [Bookmark], {nullable: true})
    getBookmark( @Ctx() context: ContextType) {
      return this.linkPreviewDataService.getLinkPreviewData(context)
    }
  
    @Mutation(()=>Bookmark)
    updateBookmark(@Arg('input') input: CreateBookmarkInput){
      return this.linkPreviewDataService.updateBookmark(input)
    }
  
    @Mutation(()=> Boolean)
    deleteBookmark(@Arg('input') input: DeleteBookmarkInput, @Ctx() context: ContextType){
      return this.linkPreviewDataService.deleteBookmark(input.id, context)
    }
}