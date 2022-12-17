import { TodoModel } from '../schema/todo.schema';

class TodoService {
  async createTodo(input: any) {
    return TodoModel.create(input);
  }
}

export default TodoService;
