import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import { CreateUserInput, LoginInput, UserModel } from '../schema/user.schema';
import { ContextType } from '../type/context';
import { signJwt, verifyJwt } from '../utils/jwt';

export class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
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
    console.log({ token });

    // set a cookies for the jwt
    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: '*',
      path: '/',
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production'
    });

    return token;
  }
}
