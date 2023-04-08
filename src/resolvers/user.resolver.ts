import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import {
  User,
  CreateUserInput,
  LoginInput,
  AuthPayload,
  CreateTeamInput
} from '../schema/user.schema';
import { UserService } from '../service/user.service';
import { ContextType } from '../type/context';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => AuthPayload)
  createUser(@Arg('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  login(@Arg('input') input: LoginInput, @Ctx() context: ContextType) {
    return this.userService.login(input, context);
  }

  @Query(() => User, { nullable: true })
  getCurrentLoggedInUser(@Ctx() context: ContextType) {
    return context.user;
  }

  @Query(() => [User], { nullable: true, defaultValue: [] })
  getMyTeamMemberDetail(@Ctx() context: ContextType) {
    return this.userService.getMyTeamMember(context);
  }

  @Mutation(() => User)
  addTeamMember(
    @Arg('input') input: CreateTeamInput,
    @Ctx() context: ContextType
  ) {
    return this.userService.addTeamMember(input, context);
  }
}
