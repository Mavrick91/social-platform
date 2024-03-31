import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePictureInput } from './dto/create-picture.input';
import { UpdatePictureInput } from './dto/update-picture.input';
import { Picture, User } from '@prisma/client';

@Injectable()
export class PictureService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username?: string): Promise<Picture[]> {
    let user: User | null = null;

    if (username) {
      user = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });
    }

    const pictures = await this.prisma.picture.findMany({
      where: { userId: user ? user.id : undefined },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        likes: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return pictures;
  }

  async findByFollowing(userId: number[]): Promise<Picture[]> {
    const pictures = await this.prisma.picture.findMany({
      where: {
        userId: {
          in: userId,
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        likes: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return pictures;
  }

  async create(input: CreatePictureInput): Promise<Picture> {
    const sizesData = {
      thumbnail: input.sizes.thumbnail,
      original: input.sizes.original,
      medium: input.sizes.medium,
      small: input.sizes.small,
    };

    return this.prisma.picture.create({
      data: {
        ...input,
        sizes: sizesData,
      },
    });
  }

  async update(id: number, input: UpdatePictureInput): Promise<Picture> {
    const picture = await this.prisma.picture.update({
      where: { id },
      data: input,
    });

    if (!picture) {
      throw new NotFoundException('Picture not found');
    }

    return picture;
  }

  async remove(id: number): Promise<Picture> {
    try {
      const picture = await this.prisma.picture.delete({
        where: { id },
        include: {
          user: true,
          likes: true,
        },
      });

      if (!picture) {
        throw new NotFoundException('Picture not found');
      }

      return picture;
    } catch (error) {
      console.log('🚀 ~ error:', error.message);
    }
  }
}
