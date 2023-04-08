import ProjectService from '../service/project.service';
import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import {
  Project,
  CreateProjectInput,
  ProjectIdInput
} from '../schema/project.schema';
import { ContextType } from '../type/context';
import { User } from '../schema/user.schema';

@Resolver()
export default class ProjectResolver {
  constructor(private projectService: ProjectService) {
    this.projectService = new ProjectService();
  }

  @Mutation(() => Project)
  createProject(
    @Arg('input') input: CreateProjectInput,
    @Ctx() context: ContextType
  ) {
    return this.projectService.createProject(input, context);
  }

  @Query(() => [Project], { nullable: true })
  getAllProjects(@Ctx() context: ContextType) {
    return this.projectService.getAllProjects(context);
  }

  @Query(() => Project)
  getProjectById(
    @Arg('input') input: ProjectIdInput,
    @Ctx() context: ContextType
  ) {
    return this.projectService.getProjectById(input, context);
  }

  @Query(() => [User], { nullable: true })
  getAllTeamMember(
    @Arg('input') input: ProjectIdInput,
    @Ctx() context: ContextType
  ) {
    return this.projectService.getAllTeamMemberByProjectId(input, context);
  }

  @Query(() => [String])
  getProjectNames(@Ctx() context: ContextType) {
    return this.projectService.getAllProjectNames(context);
  }

  @Mutation(() => Project)
  updateProject(@Arg('input') input: CreateProjectInput) {
    return this.projectService.updateProject(input);
  }

  @Mutation(() => Boolean)
  deleteProject(
    @Arg('input') input: ProjectIdInput,
    @Ctx() context: ContextType
  ) {
    return this.projectService.deleteProject(input, context);
  }
}
