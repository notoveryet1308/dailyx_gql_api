import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import {
  CreateUserInput,
  LoginInput,
  UserModel,
  CreateTeamInput
} from '../schema/user.schema';
import { ContextType } from '../type/context';
import { signJwt } from '../utils/jwt';

export class UserService {
  async createUser(input: CreateUserInput) {
    try {
      const isUserExits = await UserModel.findOne({ email: input.email });
      if (isUserExits) {
        throw new ApolloError('User can not be created');
      }
      const user = await UserModel.create(input);
      const token = signJwt(user.toObject());
      return { token, user };
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async login(input: LoginInput, context: ContextType) {
    const e = 'Invalid email or password';
    const user = await UserModel.find().findByEmail(input.email).lean();
    if (!user) {
      throw new ApolloError('user does not exits');
    }

    const passwordIsVaild = await bcrypt.compare(input.password, user.password);
    if (!passwordIsVaild) {
      throw new ApolloError(e);
    }

    const token = signJwt(user);
    return token;
  }

  async addTeamMember(input: CreateTeamInput, context: ContextType) {
    try {
      const user = context?.user;

      const getUpdatedUserData = await UserModel.findOne({ _id: user._id });

      if (!getUpdatedUserData?.email) {
        throw new ApolloError(`Invalid user detail.`);
      }

      if (getUpdatedUserData.teamMember.includes(input.email)) {
        throw new ApolloError(`${input.email} is already your team member.`);
      }
      let upadtedUserTeam = await UserModel.findOneAndUpdate(
        { _id: user._id },
        { teamMember: [...getUpdatedUserData.teamMember, input.email] }
      );

      upadtedUserTeam = await UserModel.findOne({ _id: user._id });
      return upadtedUserTeam;
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
