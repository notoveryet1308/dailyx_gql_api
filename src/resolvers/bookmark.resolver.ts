import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';

import LinkPreviewDataService from '../service/boomark.service';
import {
  Bookmark,
  UpdateBookmarkInput,
  DeleteBookmarkInput,
  GenerateLinkPreviewData,
  GenerateLinkData
} from '../schema/bookmark.schema';
import { ContextType } from '../type/context';

@Resolver()
export default class LinkPreviewDataResolver {
  constructor(private linkPreviewDataService: LinkPreviewDataService) {
    this.linkPreviewDataService = new LinkPreviewDataService();
  }

  // @Mutation(() => Bookmark)
  // createBookmark(
  //   @Arg('input') input: UpdateBookmarkInput,
  //   @Ctx() context: ContextType
  // ) {
  //   return this.linkPreviewDataService.createLinkPreviewData(input, context);
  // }

  @Mutation(() => Bookmark)
  generatePreviewData(
    @Arg('input') input: GenerateLinkPreviewData,
    @Ctx() context: ContextType
  ) {
    return this.linkPreviewDataService.generateLinkPreviewData(input, context);
  }

  @Query(() => [Bookmark], { nullable: true })
  getBookmark(@Ctx() context: ContextType) {
    return this.linkPreviewDataService.getLinkPreviewData(context);
  }

  @Mutation(() => Bookmark)
  updateBookmark(
    @Arg('input') input: UpdateBookmarkInput,
    @Ctx() context: ContextType
  ) {
    return this.linkPreviewDataService.updateBookmark(input, context);
  }

  @Mutation(() => Boolean)
  deleteBookmark(
    @Arg('input') input: DeleteBookmarkInput,
    @Ctx() context: ContextType
  ) {
    return this.linkPreviewDataService.deleteBookmark(input.id, context);
  }
}
