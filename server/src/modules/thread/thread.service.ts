import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThreadInput } from './dto/create-thread.input';
import { Message, Thread, User } from '@prisma/client';

@Injectable()
export class ThreadService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Thread[]> {
    return this.prisma.thread.findMany();
  }

  async findOne(id: number): Promise<Thread> {
    return this.prisma.thread.findUnique({ where: { id } });
  }

  async create(createThreadInput: CreateThreadInput): Promise<Thread> {
    return this.prisma.thread.create({
      data: {
        users: {
          connect: createThreadInput.userIds.map((userId) => ({ id: userId })),
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
  }

  async getThreadByUserId(userId: number): Promise<Thread[]> {
    return this.prisma.thread.findMany({
      where: { users: { some: { id: userId } } },
    });
  }

  async getThreadUsers(threadId: number): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { threads: { some: { id: threadId } } },
      include: {
        threads: {
          include: {
            messages: {
              include: { user: true },
            },
          },
        },
      },
    });
  }

  async getThreadMessages(threadId: number): Promise<Message[]> {
    return this.prisma.message.findMany({ where: { threadId } });
  }
}
