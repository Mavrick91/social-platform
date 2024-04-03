import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PubSubEngine } from 'graphql-subscriptions';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  async create(createCommentInput: CreateCommentInput) {
    try {
      const { userId, pictureId } = createCommentInput;

      const comment = await this.prisma.comment.create({
        data: createCommentInput,
      });

      const picture = await this.prisma.picture.findUnique({
        where: { id: pictureId },
      });

      if (picture.userId !== userId) {
        const notification = await this.prisma.notification.create({
          data: {
            type: 'COMMENT',
            senderId: userId,
            receiverId: picture.userId,
            commentId: comment.id,
            pictureId: pictureId,
          },
        });

        this.pubSub.publish('notificationAdded', {
          notificationAdded: notification,
        });
      }

      return comment;
    } catch (error) {
      throw new Error('Failed to create comment');
    }
  }

  async findAll() {
    try {
      return await this.prisma.comment.findMany();
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  }

  async commentsByPictureId(pictureId: number) {
    try {
      return await this.prisma.comment.findMany({
        where: { pictureId },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.comment.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error('Failed to fetch comment');
    }
  }

  async update(id: number, updateCommentInput: UpdateCommentInput) {
    try {
      return await this.prisma.comment.update({
        where: { id },
        data: updateCommentInput,
      });
    } catch (error) {
      throw new Error('Failed to update comment');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.comment.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Failed to delete comment');
    }
  }
}
