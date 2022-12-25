import { ApolloError } from 'apollo-server';
import { TodoModel, CreateTodoInput } from '../schema/todo.schema';
import { ContextType } from '../type/context';

class TodoService {
  async createTodo(input: CreateTodoInput, context: ContextType) {  
   try{
    const user = context.user
    if(user?._id){
      const newTodo = await TodoModel.create({...input, userId: user._id});
      return newTodo;
    }else{
      throw new ApolloError('User does not exists!!')
    }
   }catch(e){
      throw new ApolloError(e)
   }
    
  }

  async getTodo({ context}:{ context: ContextType}){
    try{
      
      const user = context.user
      if(!user){
        throw new ApolloError('Action not allowed!!')
      }
      const allTodo = await TodoModel.find({userId: user._id}).sort('filed isCompleted')
      return allTodo
      
    }catch(e){
      throw new ApolloError('Error in getting todo data')
    }
    
  }

  async updateTodoState(todo: CreateTodoInput, context: ContextType){
    if(!todo){
      return
    }
 
    const updatedTodo =  await TodoModel.findOneAndUpdate({id: todo.id}, {...todo})    
    return updatedTodo
  }

  async deleteTodo(id: string, context: ContextType){
   try {
   
    const user = context.user
      if(!user){
        throw new ApolloError('Action not allowed!!')
      }
    const deletedTodo = await TodoModel.deleteOne({id: id})
    
    return deletedTodo.deletedCount
   } catch (error) {
    throw new ApolloError('Error in deleting todo data')
   }
  }
}

export default TodoService;
