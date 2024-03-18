import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Picture } from '../../picture/entities/picture.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Follow } from '../../follow/entities/follow.entity';

@ObjectType()
class UserCount {
  @Field(() => Int, { defaultValue: 0 })
  pictures: number;

  @Field(() => Int, { defaultValue: 0 })
  followedBy: number;

  @Field(() => Int, { defaultValue: 0 })
  following: number;
}

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => [Picture], { defaultValue: [] })
  pictures?: Picture[];

  @Field(() => UserCount)
  _count?: UserCount;

  @Field(() => [Comment], { defaultValue: [] })
  comments?: Comment[];

  @Field(() => Boolean, { defaultValue: false })
  isMocked?: boolean;

  @Field(() => [Follow], { defaultValue: [] })
  following?: Follow[];

  @Field(() => [Follow], { defaultValue: [] })
  followedBy?: Follow[];

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;
}
