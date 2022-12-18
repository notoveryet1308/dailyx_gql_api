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
  createTodo(@Arg('input') input: CreateTodoInput) {
    console.log({inputData__: input});
    return this.todoService.createTodo(input);
  }

  @Mutation(()=>Todo)
  updateTodoState(@Arg('input') input: CreateTodoInput){
    return this.todoService.updateTodoState(input)
  }

  @Mutation(()=> Number)
  deleteTodo(@Arg('input') input: DeleteTodoInput){
    return this.todoService.deleteTodo(input.id)
  }

  @Query(() => [Todo], {nullable: true})
  getTodo( @Ctx() context: ContextType) {
    return this.todoService.getTodo({context})
  }
}
