import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async followUser(userId: number, followingId: number) {
    return this.prisma.follow.create({
      data: {
        follower: {
          connect: { id: userId },
        },
        following: {
          connect: { id: followingId },
        },
      },
    });
  }

  async unfollowUser(userId: number, followingId: number) {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followerId: userId,
        followingId: followingId,
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
