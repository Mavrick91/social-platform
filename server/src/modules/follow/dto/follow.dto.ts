import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FollowDto {
  @Field()
  userId: number;

  @Field()
  followingId: number;
}
