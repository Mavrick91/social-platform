import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Picture } from '../../picture/entities/picture.entity';
import { NotificationType } from '@prisma/client';

@ObjectType()
export class Notification {
  @Field(() => Int)
  id: number;

  @Field()
  type: NotificationType;

  @Field(() => User)
  sender: User;

  @Field(() => Int)
  senderId: number;

  @Field(() => User)
  receiver: User;

  @Field(() => Int)
  receiverId: number;

  @Field(() => Picture, { nullable: true })
  picture?: Picture;

  @Field(() => Int, { nullable: true })
  pictureId?: number;

  @Field(() => Comment, { nullable: true })
  comment?: Comment;

  @Field(() => Int, { nullable: true })
  commentId?: number;

  @Field()
  read: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
