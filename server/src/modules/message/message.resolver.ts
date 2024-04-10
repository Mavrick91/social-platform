import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { CreateMessageInput } from './dto/create-message.input';
import { Message, Thread, User } from '@prisma/client';
import { Message as MessageResponse } from './entities/message.entity';
import { Thread as ThreadResponse } from '../thread/entities/thread.entity';
import { User as UserResponse } from '../user/entities/user.entity';
import { PubSubEngine } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => MessageResponse)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Query(() => [MessageResponse])
  async messages(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Query(() => MessageResponse)
  async message(@Args('id') id: number): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Mutation(() => MessageResponse)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ): Promise<Message> {
    return this.messageService.create(createMessageInput);
  }

  @ResolveField(() => UserResponse)
  async user(@Parent() message: Message): Promise<User> {
    return this.messageService.getMessageUser(message.userId);
  }

  @ResolveField(() => ThreadResponse)
  async thread(@Parent() message: Message): Promise<Thread> {
    return this.messageService.getMessageThread(message.threadId);
  }

  @Subscription(() => MessageResponse, {
    filter: (payload, variables) => {
      return payload.messageAdded.threadId === variables.threadId;
    },
  })
  messageAdded(@Args('threadId') threadId: number) {
    return this.pubSub.asyncIterator('messageAdded');
  }
}
