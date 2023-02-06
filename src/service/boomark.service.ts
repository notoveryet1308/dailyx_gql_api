import ogs from "open-graph-scraper";

import { ApolloError } from 'apollo-server';
import { BookmarkModel, CreateBookmarkInput, GenerateLinkPreviewData, GenerateLinkData } from "../schema/bookmark.schema";
import { ContextType } from '../type/context';



export function mapOpenGraphResultToMetaData(
  result
): GenerateLinkData {
  return {
    ogTitle: result.ogTitle,
    ogDescription: result.ogDescription,
    ogUrl: result.ogUrl,
    ogImg: result.ogImage.url,
    ogSiteName: result.ogSiteName,
  };
}

class LinkPreviewDataService {
    async createLinkPreviewData(input: CreateBookmarkInput, context: ContextType) {  
        try{
         const user = context.user
         if(user?._id){
           const linkPreviewData = await BookmarkModel.create({...input, userId: user._id});
           return linkPreviewData;
         }else{
           throw new ApolloError('Error in creating link preview data')
         }
        }catch(e){
           throw new ApolloError(e)
        }
         
    }

    async generateLinkPreviewData(input: GenerateLinkPreviewData){
      
        const { error, result } = await ogs({ url: input.url });

        if(error){
          throw new ApolloError('Error in generating link preview data')
        }

        return  mapOpenGraphResultToMetaData(result)
  
    }

    async getLinkPreviewData(context: ContextType){
      try{
          
        const user = context.user
        if(!user){
          throw new ApolloError('Action not allowed!!')
        }
        const allBookamark = await BookmarkModel.find({userId: user._id})
        return allBookamark
        
      }catch(e){
        throw new ApolloError('Error in getting note data')
      }
    }

    async updateBookmark(bookmark: CreateBookmarkInput){
      try {
       if(!bookmark){
         return
       }
    
       let updatedBookmark =  await BookmarkModel.findOneAndUpdate({id: bookmark.id}, {...bookmark})   
       updatedBookmark = await BookmarkModel.findOne({id: bookmark.id})
       return updatedBookmark
      } catch (error) {
       throw new ApolloError('Error in updating bookmark data')
      }
     }
 
     async deleteBookmark(id: string, context: ContextType){
       try {
       
        const user = context.user
          if(!user){
            throw new ApolloError('Action not allowed!!')
          }
        const deletedBookmark = await BookmarkModel.deleteOne({id: id})
        
        return !!deletedBookmark.deletedCount
       } catch (error) {
        throw new ApolloError('Error in deleting bookmark')
       }
      }
}


export default LinkPreviewDataService