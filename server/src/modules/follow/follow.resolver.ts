import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { FollowDto } from './dto/follow.dto';
import { UnfollowDto } from './dto/unfollow.dto';
import { Follow } from './entities/follow.entity';

@Resolver()
export class FollowResolver {
  constructor(private followService: FollowService) {}

  @Mutation(() => Follow)
  async followUser(@Args('input') followDto: FollowDto) {
    return this.followService.followUser(
      followDto.userId,
      followDto.followingId,
    );
  }

  @Mutation(() => Follow)
  async unfollowUser(@Args('input') unfollowDto: UnfollowDto) {
    return this.followService.unfollowUser(
      unfollowDto.userId,
      unfollowDto.followingId,
    );
  }
}
