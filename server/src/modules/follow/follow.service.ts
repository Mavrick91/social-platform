import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async followUser(initiatorId: number, targetUserId: number) {
    return this.prisma.follow.create({
      data: {
        initiator: {
          connect: { id: targetUserId },
        },
        targetUser: {
          connect: { id: initiatorId },
        },
      },
    });
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
