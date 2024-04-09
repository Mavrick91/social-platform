import { Injectable } from '@nestjs/common';
import { Visibility } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThoughtInput } from './dto/create-thought.input';
import { UpdateThoughtInput } from './dto/update-thought.input';

@Injectable()
export class ThoughtService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.thought.findMany({
      where: {
        OR: [
          {
            visibility: Visibility.FOLLOWERS,
            user: { receivedFollows: { some: { id: userId } } },
          },
          {
            visibility: Visibility.CLOSE_FRIENDS,
            user: { closeFriends: { some: { id: userId } } },
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async create(createThoughtInput: CreateThoughtInput) {
    const { content, userId, visibility } = createThoughtInput;
    return this.prisma.thought.create({
      data: {
        content,
        visibility,
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async update(updateThoughtInput: UpdateThoughtInput) {
    const { id, content, visibility } = updateThoughtInput;
    return this.prisma.thought.update({
      where: { id },
      data: { content, visibility },
    });
  }

  async delete(id: number) {
    return this.prisma.thought.delete({
      where: { id },
    });
  }
}
