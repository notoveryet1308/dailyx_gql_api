import { ApolloError } from 'apollo-server';
import { Query } from 'type-graphql';

import { TagModel, CreateTagInput, Tag } from "../schema/tag.schema";
import { ContextType } from '../type/context';


export default class TagService{
    
  @Query(() => Tag)
    async createTag(input: CreateTagInput, context: ContextType) {  
        try{
         const user = context.user
         if(user?._id){
           const newTag = await TagModel.create({...input, userId: user._id});
           return newTag;
         }else{
           throw new ApolloError('User does not exists!!')
         }
        }catch(e){
           throw new ApolloError(e)
        }
         
    }

    @Query(()=> [Tag])
    async getTag(context: ContextType){
        try{
      
            const user = context.user
            if(!user){
              throw new ApolloError('Action not allowed!!')
            }
            const allTags = await TagModel.find({userId: user._id})
            return allTags
            
          }catch(e){
            throw new ApolloError('Error in getting tag data')
          } 
    }
}