import { ApolloError } from 'apollo-server';
import { NoteModel, CreateNoteInput } from "../schema/note.schema";
import { ContextType } from '../type/context';

class NoteService {

    async createNote(input: CreateNoteInput, context: ContextType) {  
        try{
         const user = context.user
         if(user?._id){
           const newTodo = await NoteModel.create({...input, userId: user._id});
           return newTodo;
         }else{
           throw new ApolloError('User does not exists!!')
         }
        }catch(e){
           throw new ApolloError(e)
        }
         
    }

    async getNote({ context}:{ context: ContextType}){
        try{
          
          const user = context.user
          if(!user){
            throw new ApolloError('Action not allowed!!')
          }
          const allNotes = await NoteModel.find({userId: user._id})
          return allNotes
          
        }catch(e){
          throw new ApolloError('Error in getting note data')
        }
        
    }
}

export default NoteService;