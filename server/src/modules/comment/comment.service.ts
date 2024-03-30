import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentInput: CreateCommentInput) {
    try {
      return await this.prisma.comment.create({
        data: createCommentInput,
      });
    } catch (error) {
      throw new Error('Failed to create comment');
    }
  }

  async findAll() {
    try {
      return await this.prisma.comment.findMany();
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  }

  async commentsByPictureId(pictureId: number) {
    try {
      return await this.prisma.comment.findMany({
        where: { pictureId },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.comment.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error('Failed to fetch comment');
    }
  }

  async update(id: number, updateCommentInput: UpdateCommentInput) {
    try {
      return await this.prisma.comment.update({
        where: { id },
        data: updateCommentInput,
      });
    } catch (error) {
      throw new Error('Failed to update comment');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.comment.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Failed to delete comment');
    }
  }
}
