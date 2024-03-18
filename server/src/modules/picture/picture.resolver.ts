import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PictureService } from './picture.service';
import { Picture } from './entities/picture.entity';
import { UpdatePictureInput } from './dto/update-picture.input';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePictureInput } from './dto/create-picture.input';
import { S3Service } from '../s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Resolver(() => Picture)
export class PictureResolver {
  constructor(
    private readonly pictureService: PictureService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  @Query(() => [Picture])
  async pictures(): Promise<Picture[]> {
    return this.pictureService.findAll();
  }

  @Query(() => Picture)
  async picture(
    @Args('id') id: number,
  ): Promise<Prisma.PictureUncheckedCreateInput> {
    try {
      return await this.pictureService.findOne(id);
    } catch (error) {
      throw new NotFoundException('Picture not found');
    }
  }

  @Query(() => [Picture])
  async picturesByAuthor(
    @Args('authorId', { nullable: true }) authorId?: number,
  ): Promise<Picture[]> {
    return this.pictureService.findByAuthor(authorId);
  }
  @Mutation(() => Picture)
  async createPicture(
    @Args('input') input: CreatePictureInput,
  ): Promise<Prisma.PictureUncheckedCreateInput> {
    try {
      return await this.pictureService.create(input);
    } catch (error) {
      throw new BadRequestException('Failed to create picture');
    }
  }

  @Mutation(() => Picture)
  async updatePicture(
    @Args('id') id: number,
    @Args('input') input: UpdatePictureInput,
  ): Promise<Prisma.PictureUncheckedCreateInput> {
    try {
      return await this.pictureService.update(id, input);
    } catch (error) {
      throw new NotFoundException('Picture not found');
    }
  }

  @Mutation(() => Picture)
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
