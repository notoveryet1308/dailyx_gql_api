import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import { User, CreateUserInput, LoginInput } from '../schema/user.schema';
import { UserService } from '../service/user.service';
import { ContextType } from '../type/context';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  login(@Arg('input') input: LoginInput, @Ctx() context: ContextType) {
    return this.userService.login(input, context);
  }

  @Query(() => User)
  getUser() {
    return {
      id: 'hxh',
      email: 'rahulraz1308@gmail.com',
      password: '000000'
    };
  }
}
