import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Picture } from './entities/picture.entity';
import { CreatePictureInput } from './dto/create-picture.input';
import { UpdatePictureInput } from './dto/update-picture.input';
// import { Picture as PrismaModel } from '@prisma/client';

@Injectable()
export class PictureService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Picture[]> {
    const pictures = await this.prisma.picture.findMany({
      include: {
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return pictures as Picture[];
  }

  async findByAuthor(authorId: number): Promise<Picture[]> {
    const pictures = await this.prisma.picture.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
    });

    return pictures as Picture[];
  }

  async findOne(id: number): Promise<Picture> {
    const picture = await this.prisma.picture.findUnique({ where: { id } });

    return picture as Picture;
  }

  async create(input: CreatePictureInput): Promise<Picture> {
    const picture = await this.prisma.picture.create({ data: input });

    return picture as Picture;
  }

  async update(id: number, input: UpdatePictureInput): Promise<Picture> {
    const picture = await this.prisma.picture.update({
      where: { id },
      data: input,
    });
    return picture as Picture;
  }

  async remove(id: number): Promise<Picture> {
    const picture = await this.prisma.picture.delete({ where: { id } });

    return picture as Picture;
  }
}
