import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PubSubEngine } from 'graphql-subscriptions';

@Injectable()
export class LikeService {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  async likePicture(userId: number, pictureId: number) {
    await this.prisma.like.create({
      data: {
        userId,
        pictureId,
      },
    });

    const picture = await this.prisma.picture.findUnique({
      where: {
        id: pictureId,
      },
      include: {
        user: true,
        likes: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (picture.userId !== userId) {
      const notification = await this.prisma.notification.create({
        data: {
          type: 'LIKE',
          senderId: userId,
          receiverId: picture.userId,
          pictureId: pictureId,
        },
        include: {
          sender: true,
          receiver: true,
          comment: true,
          picture: true,
        },
      });

      this.pubSub.publish('notificationAdded', {
        notificationAdded: notification,
      });
    }

    return picture;
  }

  async unlikePicture(likeId: number) {
    const like = await this.prisma.like.delete({
      where: {
        id: likeId,
      },
      select: {
        pictureId: true,
      },
    });
    return this.prisma.picture.findUnique({
      where: {
        id: like.pictureId,
      },
      include: {
        user: true,
        likes: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
  }
}
