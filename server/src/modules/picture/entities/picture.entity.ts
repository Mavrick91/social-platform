import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@ObjectType()
export class Picture {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  fileUrl: string;

  @Field()
  fileName: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => User)
  author: User;

  @Field(() => Int)
  authorId: number;

  @Field(() => Comment)
  comment: Comment;

  @Field(() => Int)
  commentId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
