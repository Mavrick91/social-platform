import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PubSubEngine } from 'graphql-subscriptions';

@Injectable()
export class FollowService {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  async followUser(initiatorId: number, targetUserId: number) {
    const follow = await this.prisma.follow.create({
      data: {
        initiator: {
          connect: { id: targetUserId },
        },
        targetUser: {
          connect: { id: initiatorId },
        },
      },
    });

    if (initiatorId !== targetUserId) {
      const notification = await this.prisma.notification.create({
        data: {
          type: 'FOLLOW',
          senderId: targetUserId,
          receiverId: initiatorId,
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

    return follow;
  }

  async unfollowUser(initiatorId: number, targetUserId: number) {
    const follow = await this.prisma.follow.findFirst({
      where: {
        initiatorId: initiatorId,
        targetUserId: targetUserId,
      },
    });

    if (!follow) {
      throw new Error('Follow not found');
    }

    return this.prisma.follow.delete({
      where: { id: follow.id },
    });
  }
}
