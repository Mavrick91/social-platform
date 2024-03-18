import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePictureInput } from './dto/update-picture.input';
import { Picture } from './entities/picture.entity';
import { Prisma } from '@prisma/client';
import { CreatePictureInput } from './dto/create-picture.input';

@Injectable()
export class PictureService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Picture[]> {
    const pictures = await this.prisma.picture.findMany({
      include: {
        author: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return pictures;
  }

  async findByAuthor(authorId?: number): Promise<Picture[]> {
    const pictures = await this.prisma.picture.findMany({
      where: authorId ? { authorId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return pictures as Picture[];
  }

  async findOne(id: number): Promise<Prisma.PictureUncheckedCreateInput> {
    const picture = await this.prisma.picture.findUnique({ where: { id } });

    if (!picture) {
      throw new NotFoundException('Picture not found');
    }

    return picture;
  }

  async create(
    input: CreatePictureInput,
  ): Promise<Prisma.PictureUncheckedCreateInput> {
    return this.prisma.picture.create({ data: input });
  }

  async update(
    id: number,
    input: UpdatePictureInput,
  ): Promise<Prisma.PictureUncheckedCreateInput> {
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
