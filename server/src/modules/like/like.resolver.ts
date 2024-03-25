import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '@prisma/client';
import { Picture } from '../picture/entities/picture.entity';

@Resolver()
export class LikeResolver {
  constructor(private likeService: LikeService) {}

  @Mutation(() => Picture)
  @UseGuards(GqlAuthGuard)
  async likePicture(
    @Args('pictureId') pictureId: number,
    @CurrentUser() user: User,
  ) {
    return this.likeService.likePicture(user.id, pictureId);
  }

  @Mutation(() => Picture)
  @UseGuards(GqlAuthGuard)
  async unlikePicture(@Args('likeId') likeId: number) {
    return this.likeService.unlikePicture(likeId);
  }
}
