import { Inject, Injectable } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationInput } from './dto/create-notification';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  async create(createNotificationInput: CreateNotificationInput) {
    try {
      const notification = await this.prisma.notification.create({
        data: createNotificationInput,
      });

      this.pubSub.publish('notificationAdded', {
        notificationAdded: notification,
      });

      return notification;
    } catch (error) {
      throw new Error('Failed to create notification');
    }
  }

  async findAllForUser(userId: number) {
    try {
      return await this.prisma.notification.findMany({
        where: { receiverId: userId },
        orderBy: { createdAt: 'desc' },
        include: {
          sender: true,
          picture: true,
          comment: true,
        },
      });
    } catch (error) {
      throw new Error('Failed to fetch notifications');
    }
  }

  async markAsRead(notificationIds: number[]) {
    return this.prisma.notification.updateMany({
      where: { id: { in: notificationIds } },
      data: { read: true },
    });
  }
}
