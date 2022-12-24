import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import { CreateUserInput, LoginInput, UserModel } from '../schema/user.schema';
import { ContextType } from '../type/context';
import { signJwt } from '../utils/jwt';

export class UserService {
  async createUser(input: CreateUserInput) {
   const user = await UserModel.create(input);
   const token = signJwt(user)
   return token
  }

  async login(input: LoginInput, context: ContextType) {
    const e = 'Invalid email or password';
    const user = await UserModel.find().findByEmail(input.email).lean();
    if (!user) {
      throw new ApolloError(e);
    }

    const passwordIsVaild = await bcrypt.compare(input.password, user.password);
    if (!passwordIsVaild) {
      throw new ApolloError(e);
    }

    const token = signJwt(user);
    return token;
  }
}
