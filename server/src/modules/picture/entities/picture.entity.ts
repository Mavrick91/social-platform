import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@ObjectType()
class PictureCount {
  @Field(() => Int)
  comments: number;
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

  @Field(() => User, { nullable: true })
  author?: User;

  // @Field(() => Int, { nullable: true })
  // authorId: number;

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => PictureCount, { nullable: true })
  _count?: PictureCount;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
