import ProjectService from "../service/project.service";
import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import { Project, CreateProjectInput, DeleteProjectInput } from '../schema/project.schema';
import { ContextType } from '../type/context';

@Resolver()
export default class ProjectResolver {
  constructor(private projectService: ProjectService) {
    this.projectService = new ProjectService();
  }

  @Mutation(() => Project)
  createProject(@Arg('input') input: CreateProjectInput, @Ctx() context: ContextType) {
    return this.projectService.createProject(input, context);
  }

  @Query(() => [Project], {nullable: true})
  getProject( @Ctx() context: ContextType) {
    return this.projectService.getProject(context)
  }

  @Query(() => [String])
  getProjectNames( @Ctx() context: ContextType) {
    return this.projectService.getAllProjectNames(context)
  }

  @Mutation(()=> Project)
  updateProject(@Arg('input') input: CreateProjectInput){
    return this.projectService.updateProject(input)
  }

  @Mutation(()=> Boolean)
  deleteProject(@Arg('input') input: DeleteProjectInput, @Ctx() context: ContextType){
    return this.projectService.deleteProject(input.id, context)
  }

}
