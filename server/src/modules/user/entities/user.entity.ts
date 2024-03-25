import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Picture } from '../../picture/entities/picture.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Follow } from '../../follow/entities/follow.entity';
import { Like } from '../../like/entities/like.entity';

@ObjectType()
class UserCount {
  @Field(() => Int, { defaultValue: 0 })
  pictures: number;

  @Field(() => Int, { defaultValue: 0 })
  initiatedFollows: number;

  @Field(() => Int, { defaultValue: 0 })
  receivedFollows: number;
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

  @Field()
  username: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  avatarName: string;

  @Field(() => [Picture], { defaultValue: [] })
  pictures: Picture[];

  @Field(() => UserCount)
  _count?: UserCount;

  @Field(() => [Comment], { defaultValue: [] })
  comments?: Comment[];

  @Field(() => Boolean, { defaultValue: false })
  isMocked?: boolean;

  @Field(() => [Follow], { defaultValue: [] })
  initiatedFollows?: Follow[];

  @Field(() => [Follow], { defaultValue: [] })
  receivedFollows?: Follow[];

  @Field(() => [Like], { nullable: true })
  likes?: Like[];

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;
}
