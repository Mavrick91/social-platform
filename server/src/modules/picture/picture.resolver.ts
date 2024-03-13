import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PictureService } from './picture.service';
import { Picture } from './entities/picture.entity';
import { CreatePictureInput } from './dto/create-picture.input';
import { UpdatePictureInput } from './dto/update-picture.input';

@Resolver(() => Picture)
export class PictureResolver {
  constructor(private readonly pictureService: PictureService) {}

  @Query(() => [Picture])
  async pictures(): Promise<Picture[]> {
    return this.pictureService.findAll();
  }

  @Query(() => Picture)
  async picture(@Args('id') id: number): Promise<Picture> {
    return this.pictureService.findOne(id);
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
    return this.pictureService.create(input);
  }

  @Mutation(() => Picture)
  async updatePicture(
    @Args('id') id: number,
    @Args('input') input: UpdatePictureInput,
  ): Promise<Picture> {
    return this.pictureService.update(id, input);
  }

  @Mutation(() => Picture)
  async deletePicture(@Args('id') id: number): Promise<Picture> {
    return this.pictureService.remove(id);
  }
}
