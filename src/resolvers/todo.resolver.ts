import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Todo, CreateTodoInput } from '../schema/todo.schema';
import TodoService from '../service/todo.service';

@Resolver()
export default class TodoResolver {
  constructor(private todoService: TodoService) {
    this.todoService = new TodoService();
  }

  @Mutation(() => Todo)
  createTodo(@Arg('input') input: CreateTodoInput) {
    return this.todoService.createTodo(input);
  }

  @Query(() => Todo)
  getTodo() {
    return {
      id: 'todo-1',
      duration: 2,
      createdOn: Date.now(),
      description: 'Get on call with your lead to solve UI problems',
      isCompleted: false
    };
  }
}
