import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePictureInput } from './dto/create-picture.input';
import { UpdatePictureInput } from './dto/update-picture.input';
import { Picture } from '@prisma/client';

@Injectable()
export class PictureService {
  constructor(private readonly prisma: PrismaService) {}

  async findByAuthor(authorId?: number): Promise<Picture[]> {
    const pictures = await this.prisma.picture.findMany({
      where: authorId ? { authorId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
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

  async findByFollowing(authorId: number[]): Promise<Picture[]> {
    const pictures = await this.prisma.picture.findMany({
      where: {
        authorId: {
          in: authorId,
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
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
    return this.prisma.picture.create({ data: input });
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
          author: true,
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
