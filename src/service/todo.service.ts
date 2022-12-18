import { ApolloError } from 'apollo-server';
import { TodoModel, CreateTodoInput } from '../schema/todo.schema';
import { ContextType } from '../type/context';

class TodoService {
  async createTodo(input: CreateTodoInput) {  
    return await TodoModel.create(input);
  }

  async getTodo({ context}:{ context: ContextType}){
    try{
   
      const allTodo = await TodoModel.find()
      return allTodo
      
    }catch(e){
      throw new ApolloError('Error in getting todo data')
    }
    
  }

  async updateTodoState(todo: CreateTodoInput){
    if(!todo){
      return
    }
 
    const updatedTodo =  await TodoModel.findOneAndUpdate({id: todo.id}, {...todo})
    console.log({updatedTodo, todo});
    
    return updatedTodo
  }

  async deleteTodo(id?: string){
   try {
    if(!id){
      return await TodoModel.deleteMany({})
    }
    const deletedTodo = await TodoModel.deleteOne({id: id})
    
    return deletedTodo.deletedCount
   } catch (error) {
    throw new ApolloError('Error in deleting todo data')
   }
  }
}

export default TodoService;
