import { Injectable } from '@nestjs/common';
import { Collection, PictureOnCollection } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

  async addPictureToCollection(
    collectionId: number,
    pictureIds: number[],
  ): Promise<PictureOnCollection[]> {
    const existingPictures = await this.prisma.pictureOnCollection.findMany({
      where: {
        pictureId: {
          in: pictureIds,
        },
        collectionId,
      },
    });

    if (existingPictures.length > 0) {
      throw new Error('Some pictures are already in the collection');
    }

    const createdPictures = await Promise.all(
      pictureIds.map((pictureId) =>
        this.prisma.pictureOnCollection.create({
          data: {
            collectionId,
            pictureId,
          },
        }),
      ),
    );

    return createdPictures;
  }

  async removePictureFromCollection(collectionId: number, pictureId: number) {
    return this.prisma.pictureOnCollection.delete({
      where: {
        pictureId_collectionId: {
          pictureId,
          collectionId,
        },
      },
    });
  }

  async getCollectionsByUser(userId: number): Promise<Collection[]> {
    return this.prisma.collection.findMany({
      where: {
        userId: userId,
      },
      include: {
        pictures: {
          include: {
            picture: true,
          },
        },
      },
    });
  }

  async createCollection(userId: number, name: string) {
    return this.prisma.collection.create({
      data: {
        name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async deleteCollection(collectionId: number) {
    await this.prisma.pictureOnCollection.deleteMany({
      where: { collectionId },
    });

    return this.prisma.collection.delete({
      where: { id: collectionId },
    });
  }

  async deleteAllCollectionsForUser(userId: number) {
    const collections = await this.prisma.collection.findMany({
      where: {
        userId,
      },
    });

    const minIdCollection = collections.reduce((prev, curr) =>
      prev.id < curr.id ? prev : curr,
    );

    await this.prisma.pictureOnCollection.deleteMany({
      where: {
        collection: {
          userId,
          id: {
            not: minIdCollection.id,
          },
        },
      },
    });

    await this.prisma.collection.deleteMany({
      where: {
        userId,
        id: {
          not: minIdCollection.id,
        },
      },
    });
  }
}
