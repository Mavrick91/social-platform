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

    const existingPictureIds = existingPictures.map((pic) => pic.pictureId);

    const newPictureIds = pictureIds.filter(
      (picId) => !existingPictureIds.includes(picId),
    );

    return await Promise.all(
      newPictureIds.map((pictureId) =>
        this.prisma.pictureOnCollection.create({
          data: {
            collectionId,
            pictureId,
          },
          include: {
            picture: true,
          },
        }),
      ),
    );
  }

  async removePictureFromAllUserCollections(
    userId: number,
    pictureId: number,
  ): Promise<Collection[]> {
    const collections = await this.prisma.collection.findMany({
      where: {
        userId: userId,
        pictures: {
          some: {
            pictureId: pictureId,
          },
        },
      },
    });

    await this.prisma.pictureOnCollection.deleteMany({
      where: {
        pictureId: pictureId,
        collection: {
          userId: userId,
        },
      },
    });

    return collections;
  }

  async getCollection(
    collectionName: string,
    userId: number,
  ): Promise<Collection> {
    return this.prisma.collection.findFirst({
      where: {
        nameId: collectionName,
        userId: userId,
      },
      include: {
        pictures: {
          include: {
            picture: {
              include: {
                user: true,
                likes: {
                  include: {
                    user: true,
                  },
                },
                _count: true,
              },
            },
          },
        },
      },
    });
  }

  async createCollection(userId: number, name: string) {
    return this.prisma.collection.create({
      data: {
        name,
        nameId: name.toLowerCase().replace(/ /g, '-'),
        isDefault: false,
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

  async updateCollectionName(collectionId: number, newName: string) {
    return this.prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        name: newName,
        nameId: newName.toLowerCase().replace(/ /g, '-'),
      },
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
