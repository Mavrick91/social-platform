import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginResponse } from './dto/login-response.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { S3Service } from '../s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('profileId') id: number): Promise<User> {
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
    @Args('profileId') profileId: number,
    @Args('updateUserInput') updateUserInput: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userService.findOne(profileId);
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

      return await this.userService.update(profileId, updateUserInput);
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
