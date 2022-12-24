import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import { Todo, CreateTodoInput, DeleteTodoInput } from '../schema/todo.schema';
import TodoService from '../service/todo.service';
import { ContextType } from '../type/context';

@Resolver()
export default class TodoResolver {
  constructor(private todoService: TodoService) {
    this.todoService = new TodoService();
  }

  @Mutation(() => Todo)
  createTodo(@Arg('input') input: CreateTodoInput, @Ctx() context: ContextType) {
    return this.todoService.createTodo(input, context);
  }

  @Mutation(()=>Todo)
  updateTodoState(@Arg('input') input: CreateTodoInput, @Ctx() context: ContextType){
    return this.todoService.updateTodoState(input, context)
  }

  @Mutation(()=> Number)
  deleteTodo(@Arg('input') input: DeleteTodoInput, @Ctx() context: ContextType){
    return this.todoService.deleteTodo(input.id, context)
  }

  @Query(() => [Todo], {nullable: true})
  getTodo( @Ctx() context: ContextType) {
    return this.todoService.getTodo({context})
  }
}
