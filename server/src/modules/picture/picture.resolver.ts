import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PictureService } from './picture.service';
import { Picture } from './entities/picture.entity';
import { CreatePictureInput } from './dto/create-picture.input';
import { UpdatePictureInput } from './dto/update-picture.input';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Resolver(() => Picture)
export class PictureResolver {
  constructor(private readonly pictureService: PictureService) {}

  @Query(() => [Picture])
  async pictures(): Promise<Picture[]> {
    return this.pictureService.findAll();
  }

  @Query(() => Picture)
  async picture(@Args('id') id: number): Promise<Picture> {
    try {
      return await this.pictureService.findOne(id);
    } catch (error) {
      throw new NotFoundException('Picture not found');
    }
  }

  @Query(() => [Picture])
  async picturesByAuthor(
    @Args('authorId') authorId: number,
  ): Promise<Picture[]> {
    return this.pictureService.findByAuthor(authorId);
  }

  @Mutation(() => Picture)
  async createPicture(
    @Args('input') input: CreatePictureInput,
  ): Promise<Picture> {
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
  ): Promise<Picture> {
    try {
      return await this.pictureService.update(id, input);
    } catch (error) {
      throw new NotFoundException('Picture not found');
    }
  }

  @Mutation(() => Picture)
  async deletePicture(@Args('id') id: number): Promise<Picture> {
    try {
      return await this.pictureService.remove(id);
    } catch (error) {
      throw new NotFoundException('Picture not found');
    }
  }
}
