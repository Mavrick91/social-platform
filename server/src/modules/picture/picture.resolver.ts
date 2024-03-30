import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { S3Service } from '../s3/s3.service';
import { CreatePictureInput } from './dto/create-picture.input';
import { UpdatePictureInput } from './dto/update-picture.input';
import { PictureService } from './picture.service';
import { Picture } from '@prisma/client';
import { Picture as PictureResponse } from './entities/picture.entity';

@Resolver(() => PictureResponse)
export class PictureResolver {
  constructor(
    private readonly pictureService: PictureService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  @Query(() => [PictureResponse])
  @UseGuards(GqlAuthGuard)
  async picturesByUsername(
    @Args('username', { nullable: true }) username?: string,
  ): Promise<Picture[]> {
    return this.pictureService.findByUsername(username);
  }

  @Query(() => [PictureResponse])
  @UseGuards(GqlAuthGuard)
  async picturesFromFollowing(
    @Args('userId', { type: () => [Number] }) userId?: number[],
  ): Promise<Picture[]> {
    return this.pictureService.findByFollowing(userId);
  }

  @Mutation(() => PictureResponse)
  @UseGuards(GqlAuthGuard)
  async createPicture(
    @Args('input') input: CreatePictureInput,
  ): Promise<Picture> {
    try {
      return await this.pictureService.create(input);
    } catch (error) {
      throw new BadRequestException('Failed to create picture');
    }
  }

  @Mutation(() => PictureResponse)
  @UseGuards(GqlAuthGuard)
  async updatePicture(
    @Args('id') id: number,
    @Args('input') input: UpdatePictureInput,
  ): Promise<Picture> {
    try {
      return await this.pictureService.update(id, input);
    } catch (error) {
      throw new NotFoundException('Picture not found');
    }
  }

  @Mutation(() => PictureResponse)
  @UseGuards(GqlAuthGuard)
  async deletePicture(@Args('id') id: number): Promise<Picture> {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');

    try {
      const picture = await this.pictureService.remove(id);
      await this.s3Service.deleteFile(bucketName, picture.fileName);

      return picture;
    } catch (error) {
      throw new NotFoundException('Picture not found');
    }
  }
}
