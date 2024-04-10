import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageInput } from './dto/create-message.input';
import { Message, Thread, User } from '@prisma/client';
import { PubSubEngine } from 'graphql-subscriptions';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  async findAll(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }

  async findOne(id: number): Promise<Message> {
    return this.prisma.message.findUnique({ where: { id } });
  }

  async create(createMessageInput: CreateMessageInput): Promise<Message> {
    const message = await this.prisma.message.create({
      data: {
        content: createMessageInput.content,
        user: {
          connect: { id: createMessageInput.userId },
        },
        thread: {
          connect: { id: createMessageInput.threadId },
        },
      },
      include: {
        user: true,
        thread: true,
      },
    });

    this.pubSub.publish('messageAdded', { messageAdded: message });

    return message;
  }

  async getMessageUser(userId: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getMessageThread(threadId: number): Promise<Thread> {
    return this.prisma.thread.findUnique({ where: { id: threadId } });
  }
}
