import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationInput } from './dto/create-notification';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationInput: CreateNotificationInput) {
    try {
      const notification = await this.prisma.notification.create({
        data: createNotificationInput,
      });

      return notification;
    } catch (error) {
      throw new Error('Failed to create notification');
    }
  }

  async findAllForUser(userId: number, page: number, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;

      const [notifications, totalCount] = await Promise.all([
        this.prisma.notification.findMany({
          where: { receiverId: userId },
          orderBy: { createdAt: 'desc' },
          include: {
            sender: true,
            picture: true,
            comment: true,
          },
          skip,
          take: limit,
        }),
        this.prisma.notification.count({
          where: { receiverId: userId },
        }),
      ]);

      return {
        notifications,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      };
    } catch (error) {
      throw new Error('Failed to fetch notifications');
    }
  }

  async markAsRead(notificationIds: number[]) {
    await this.prisma.notification.updateMany({
      where: { id: { in: notificationIds } },
      data: { read: true },
    });

    const updatedNotifications = await this.prisma.notification.findMany({
      where: { id: { in: notificationIds } },
    });

    return updatedNotifications;
  }
}
