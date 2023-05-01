import { ApolloError } from 'apollo-server';
import {
  ProjectModel,
  CreateProjectInput,
  ProjectIdInput
} from '../schema/project.schema';
import { TicketModel } from '../schema/ticket.schema';
import { UserModel } from '../schema/user.schema';
import { ContextType } from '../type/context';

const modifyTicketDataKey = ({ key, data = [] }) => {
  const modifiedData = {};

  data.forEach((d) => {
    if (!modifiedData[d[`${key}`]]) {
      modifiedData[d[`${key}`]] = [d];
    } else if (modifiedData[d[`${key}`]]) {
      modifiedData[d[`${key}`]].push(d);
      modifiedData[d[`${key}`]] = modifiedData[d[`${key}`]];
    }
  });

  return modifiedData;
};

class ProjectService {
  async createProject(input: CreateProjectInput, context: ContextType) {
    try {
      const user = context.user;
      if (user?._id) {
        const updatedUserData = await UserModel.findOne({ _id: user._id });

        if (!updatedUserData) {
          throw new ApolloError('User does not exists!!');
        }
        const newProject = await ProjectModel.create({
          ...input,
          owner: updatedUserData
        });
        return newProject;
      } else {
        throw new ApolloError('User does not exists!!');
      }
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async getAllTeamMemberByProjectId(
    input: ProjectIdInput,
    context: ContextType
  ) {
    try {
      const user = context.user;
      if (user?._id) {
        const project = await ProjectModel.findOne({ id: input.id });

        if (!project) {
          throw new ApolloError('Invalid project ID');
        }
        const members = project.owner.teamMember;
        const users = await UserModel.find({});

        const memberDetails = users.filter((d) => members.includes(d.email));

        return memberDetails;
      }
    } catch (error) {}
  }

  async getAllProjects(context: ContextType) {
    try {
      const user = context.user;
      if (user?._id) {
        let allProject = await ProjectModel.find();
        let allTickets = await TicketModel.find();

        const modifiedTicketData = modifyTicketDataKey({
          key: 'projectId',
          data: allTickets
        });

        const modifiedProjectData = allProject.filter((data) => {
          if (
            data.owner._id.valueOf() === user._id ||
            data.owner.teamMember.includes(user.email)
          ) {
            data['tickets'] = modifiedTicketData[`${data.id}`];
            return data;
          }
        });

        return modifiedProjectData;
      } else {
        throw new ApolloError('User does not exists!!');
      }
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async getProjectById(input: ProjectIdInput, context: ContextType) {
    try {
      const user = context.user;
      const project = await ProjectModel.findOne({ id: input.id });

      if (
        project.owner.teamMember.includes(user.email) ||
        project.owner._id.valueOf() === user._id
      ) {
        let allTickets = await TicketModel.find();

        const modifiedTicketData = modifyTicketDataKey({
          key: 'projectId',
          data: allTickets
        });

        project['tickets'] = modifiedTicketData[`${input.id}`];

        return project;
      } else {
        throw new ApolloError('ACCESS_DENIED');
      }
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async getAllProjectNames(context: ContextType) {
    try {
      const user = context.user;
      if (user?._id) {
        let allProject = await ProjectModel.find();
        const projectNames = allProject
          .filter((data) => data.owner._id.valueOf() === user._id)
          .map((d) => d.name);

        return projectNames;
      } else {
        throw new ApolloError('User does not exists!!');
      }
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async updateProject(project: CreateProjectInput) {
    try {
      if (!project) {
        return;
      }

      let updatedProject = await ProjectModel.findOneAndUpdate(
        { id: project.id },
        { ...project }
      );
      updatedProject = await ProjectModel.findOne({ id: project.id });
      return updatedProject;
    } catch (error) {
      throw new ApolloError('Error in updating project data');
    }
  }

  async deleteProject(input: ProjectIdInput, context: ContextType) {
    try {
      const user = context.user;
      if (!user) {
        throw new ApolloError('Action not allowed!!');
      }
      const deletedProject = await ProjectModel.deleteOne({ id: input.id });

      return !!deletedProject.deletedCount;
    } catch (error) {
      throw new ApolloError('Error in deleting project data');
    }
  }
}

export default ProjectService;
