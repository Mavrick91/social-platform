import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginResponse } from './dto/login-response.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserDto) {
    console.log('😀😀', { createUserInput });
    return this.userService.create(createUserInput);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<LoginResponse> {
    return this.userService.login(email, password);
  }
}
