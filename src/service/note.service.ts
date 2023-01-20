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

    async updateNote(note: CreateNoteInput){
     try {
      if(!note){
        return
      }
   
      let updatedNote =  await NoteModel.findOneAndUpdate({id: note.id}, {...note})   
      updatedNote = await NoteModel.findOne({id: note.id})
      return updatedNote
     } catch (error) {
      throw new ApolloError('Error in updating note data')
     }
    }

    async deleteNote(id: string, context: ContextType){
      try {
      
       const user = context.user
         if(!user){
           throw new ApolloError('Action not allowed!!')
         }
       const deletedNote = await NoteModel.deleteOne({id: id})
       
       return !!deletedNote.deletedCount
      } catch (error) {
       throw new ApolloError('Error in deleting note data')
      }
     }
}

export default NoteService;