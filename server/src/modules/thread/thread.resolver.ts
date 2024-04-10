import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ThreadService } from './thread.service';
import { CreateThreadInput } from './dto/create-thread.input';
import { Thread as ThreadResponse } from './entities/thread.entity';
import { Message, Thread, User } from '@prisma/client';
import { User as UserResponse } from '../user/entities/user.entity';
import { Message as MessageResponse } from '../message/entities/message.entity';

@Resolver(() => ThreadResponse)
export class ThreadResolver {
  constructor(private readonly threadService: ThreadService) {}

  @Query(() => [ThreadResponse])
  async threads(): Promise<Thread[]> {
    return this.threadService.findAll();
  }

  @Query(() => [ThreadResponse])
  async threadsByUserId(@Args('userId') userId: number): Promise<Thread[]> {
    return this.threadService.getThreadByUserId(userId);
  }

  @Query(() => ThreadResponse)
  async thread(@Args('id') id: number): Promise<Thread> {
    return this.threadService.findOne(id);
  }

  @Mutation(() => ThreadResponse)
  async createThread(
    @Args('createThreadInput') createThreadInput: CreateThreadInput,
  ): Promise<Thread> {
    return this.threadService.create(createThreadInput);
  }

  @ResolveField(() => [UserResponse])
  async users(@Parent() thread: Thread): Promise<User[]> {
    return this.threadService.getThreadUsers(thread.id);
  }

  @ResolveField(() => [MessageResponse])
  async messages(@Parent() thread: Thread): Promise<Message[]> {
    return this.threadService.getThreadMessages(thread.id);
  }
}
