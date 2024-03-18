import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginResponse } from './dto/login-response.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('userId') id: number): Promise<User> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw new BadRequestException('User not found');
    }
  }

  @Query(() => [User])
  async mockedUser(): Promise<User[]> {
    try {
      return await this.userService.findMockedUser();
    } catch (error) {
      throw new BadRequestException('User not found');
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.userService.update(id, updateUserInput);
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    try {
      return await this.userService.create(createUserInput);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to create user');
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<LoginResponse> {
    try {
      return await this.userService.login(email, password);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new BadRequestException('Failed to login');
    }
  }
}
