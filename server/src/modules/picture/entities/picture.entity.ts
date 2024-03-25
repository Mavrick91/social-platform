import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../like/entities/like.entity';

@ObjectType()
class PictureCount {
  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  likes: number;
}

@ObjectType()
export class Picture {
  @Field(() => Int)
  id: number;

  @Field()
  fileUrl: string;

  @Field({ nullable: true })
  fileName: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => User)
  author: User;

  @Field(() => [Like], { defaultValue: [] })
  likes: Like[];

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => PictureCount)
  _count: PictureCount;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
