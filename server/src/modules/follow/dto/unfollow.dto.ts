import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UnfollowDto {
  @Field()
  userId: number;

  @Field()
  followingId: number;
}
