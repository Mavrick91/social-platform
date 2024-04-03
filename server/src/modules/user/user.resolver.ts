import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { NotificationUser } from '../notification/entities/notification-user.entity';
import { S3Service } from '../s3/s3.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginResponse } from './dto/login-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserResponse } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => UserResponse)
export class UserResolver {
  constructor(
    private userService: UserService,
    private s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  @Query(() => [UserResponse])
  @UseGuards(GqlAuthGuard)
  async users(@CurrentUser() user: User): Promise<User[]> {
    return this.userService.findAll(user);
  }

  @Query(() => [UserResponse])
  @UseGuards(GqlAuthGuard)
  async usersByUsername(
    @Args('username') username: string,
    @CurrentUser() user: User,
  ): Promise<User[]> {
    return this.userService.findUsersByUsername(user, username);
  }

  @Query(() => UserResponse)
  @UseGuards(GqlAuthGuard)
  async user(
    @Args('username') username: string,
  ): Promise<User & { unreadNotifications: NotificationUser[] }> {
    try {
      return await this.userService.findOne(username);
    } catch (error) {
      throw new BadRequestException('User not found');
    }
  }

  @Query(() => [UserResponse])
  async mockedUser(): Promise<User[]> {
    try {
      return await this.userService.findMockedUser();
    } catch (error) {
      throw new BadRequestException('User not found');
    }
  }

  @Mutation(() => UserResponse)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('username') username: string,
    @Args('updateUserInput') updateUserInput: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userService.findOne(username);
      const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');

      if (
        updateUserInput.avatar &&
        user.avatar &&
        user.avatar.startsWith(`https://${bucketName}.s3.amazonaws.com`)
      ) {
        const avatarName = user.avatarName;
        if (avatarName) {
          await this.s3Service.deleteFile(bucketName, avatarName);
        }
      }

      return await this.userService.update(username, updateUserInput);
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  @Mutation(() => UserResponse)
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
