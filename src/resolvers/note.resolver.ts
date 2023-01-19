import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import { Note, CreateNoteInput } from '../schema/note.schema';
import NoteService from '../service/note.service';
import { ContextType } from '../type/context';

@Resolver()
export default class NoteResolver {
  constructor(private noteService: NoteService) {
    this.noteService = new NoteService();
  }

  @Mutation(() => Note)
  createNote(@Arg('input') input: CreateNoteInput, @Ctx() context: ContextType) {
    return this.noteService.createNote(input, context);
  }

  @Query(() => [Note], {nullable: true})
  getNote( @Ctx() context: ContextType) {
    return this.noteService.getNote({context})
  }

//   @Mutation(()=>Note)
//   updateTodoState(@Arg('input') input: CreateTodoInput, @Ctx() context: ContextType){
//     return this.noteService.updateTodoState(input, context)
//   }

//   @Mutation(()=> Number)
//   deleteTodo(@Arg('input') input: DeleteTodoInput, @Ctx() context: ContextType){
//     return this.noteService.deleteTodo(input.id, context)
//   }

 
}
