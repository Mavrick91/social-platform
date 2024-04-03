import { InputType, Field, Int } from '@nestjs/graphql';
import { NotificationType } from '@prisma/client';

@InputType()
export class CreateNotificationInput {
  @Field(() => NotificationType)
  type: NotificationType;

  @Field(() => Int)
  senderId: number;

  @Field(() => Int)
  receiverId: number;

  @Field(() => Int, { nullable: true })
  pictureId?: number;

  @Field(() => Int, { nullable: true })
  commentId?: number;
}
