import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Follow {
  @Field()
  followerId: number;

  @Field()
  followingId: number;
}
