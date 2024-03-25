import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async likePicture(userId: number, pictureId: number) {
    await this.prisma.like.create({
      data: {
        userId,
        pictureId,
      },
    });

    return this.prisma.picture.findUnique({
      where: {
        id: pictureId,
      },
      include: {
        author: true,
        likes: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
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
        author: true,
        likes: true,
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
