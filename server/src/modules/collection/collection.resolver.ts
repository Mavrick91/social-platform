import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Collection, PictureOnCollection, User } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CollectionService } from './collection.service';
import { Collection as CollectionResponse } from './entities/collection.entity';
import { PictureOnCollection as PictureOnResponse } from './entities/picture-on-collection.entity';

@Resolver()
export class CollectionResolver {
  constructor(private collectionService: CollectionService) {}

  @Mutation(() => [PictureOnResponse])
  @UseGuards(GqlAuthGuard)
  async addPictureToCollection(
    @Args('collectionId', { type: () => Number }) collectionId: number,
    @Args('pictureId', { type: () => [Number] }) pictureId: number[],
  ): Promise<PictureOnCollection[]> {
    return this.collectionService.addPictureToCollection(
      collectionId,
      pictureId,
    );
  }

  @Mutation(() => [CollectionResponse])
  @UseGuards(GqlAuthGuard)
  async removePictureFromCollection(
    @Args('pictureId') pictureId: number,
    @CurrentUser() user: User,
  ): Promise<Collection[]> {
    return this.collectionService.removePictureFromAllUserCollections(
      user.id,
      pictureId,
    );
  }

  @Mutation(() => CollectionResponse)
  @UseGuards(GqlAuthGuard)
  async createCollection(
    @Args('name') name: string,
    @CurrentUser('user') user: User,
  ): Promise<Collection> {
    return this.collectionService.createCollection(user.id, name);
  }

  @Query(() => CollectionResponse)
  @UseGuards(GqlAuthGuard)
  async getCollection(
    @Args('collectionName') collectionName: string,
    @CurrentUser() user: User,
  ): Promise<Collection> {
    return this.collectionService.getCollection(collectionName, user.id);
  }

  @Mutation(() => CollectionResponse)
  @UseGuards(GqlAuthGuard)
  async deleteCollection(
    @Args('collectionId') collectionId: number,
  ): Promise<Collection> {
    return this.collectionService.deleteCollection(collectionId);
  }

  @Mutation(() => CollectionResponse)
  @UseGuards(GqlAuthGuard)
  async updateNameCollection(
    @Args('collectionId') collectionId: number,
    @Args('newName') newName: string,
  ): Promise<Collection> {
    return this.collectionService.updateCollectionName(collectionId, newName);
  }

  @Mutation(() => CollectionResponse)
  async deleteAllCollectionsForUser(
    @Args('userId') userId: number,
  ): Promise<any> {
    return this.collectionService.deleteAllCollectionsForUser(userId);
  }
}
