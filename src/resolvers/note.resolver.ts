import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import { Note, CreateNoteInput, DeleteNoteInput } from '../schema/note.schema';
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

  @Mutation(()=>Note)
  updateNote(@Arg('input') input: CreateNoteInput){
    return this.noteService.updateNote(input)
  }

  @Mutation(()=> Boolean)
  deleteNote(@Arg('input') input: DeleteNoteInput, @Ctx() context: ContextType){
    return this.noteService.deleteNote(input.id, context)
  }

}
