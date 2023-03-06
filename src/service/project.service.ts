import { ApolloError } from 'apollo-server';
import { ProjectModel, CreateProjectInput } from "../schema/project.schema";
import { ContextType } from '../type/context';

class ProjectService {

    async createProject(input: CreateProjectInput, context: ContextType) {  
        try{
         const user = context.user
         if(user?._id){
           const newProject = await ProjectModel.create({...input, owner: user});
           return newProject;
         }else{
           throw new ApolloError('User does not exists!!')
         }
        }catch(e){
           throw new ApolloError(e)
        }        
    }

    async getProject(context: ContextType) {
        try{
            const user = context.user
            if(user?._id){
            let allProject = await ProjectModel.find();    
            allProject = allProject.filter(data=> data.owner._id.valueOf() === user._id);
            return allProject;
            }else{
            throw new ApolloError('User does not exists!!')
            }
        }catch(e){
            throw new ApolloError(e)
        }  
    }

    async getAllProjectNames(context: ContextType) {
        try{
            const user = context.user
            if(user?._id){
            let allProject = await ProjectModel.find();    
            const projectNames = allProject.filter(data=> data.owner._id.valueOf() === user._id).map(d=> d.name)
            console.log({projectNames})
            return projectNames;
            }else{
            throw new ApolloError('User does not exists!!')
            }
        }catch(e){
            throw new ApolloError(e)
        }  
    }

    // async getNote({ context}:{ context: ContextType}){
    //     try{
          
    //       const user = context.user
    //       if(!user){
    //         throw new ApolloError('Action not allowed!!')
    //       }
    //       const allNotes = await NoteModel.find({userId: user._id})
    //       return allNotes
          
    //     }catch(e){
    //       throw new ApolloError('Error in getting note data')
    //     }
        
    // }

    async updateProject(project: CreateProjectInput){
     try {
      if(!project){
        return
      }
   
      let updatedProject =  await ProjectModel.findOneAndUpdate({id: project.id}, {...project})   
      updatedProject = await ProjectModel.findOne({id: project.id})
      return updatedProject
     } catch (error) {
      throw new ApolloError('Error in updating project data')
     }
    }

    async deleteProject(id: string, context: ContextType){
      try {
      
       const user = context.user
         if(!user){
           throw new ApolloError('Action not allowed!!')
         }
       const deletedProject = await ProjectModel.deleteOne({id: id})
       
       return !!deletedProject.deletedCount
      } catch (error) {
       throw new ApolloError('Error in deleting project data')
      }
     }
}

export default ProjectService;