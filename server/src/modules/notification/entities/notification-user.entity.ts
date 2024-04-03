import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NotificationType } from '@prisma/client';

@ObjectType()
export class NotificationUser {
  @Field(() => Int)
  id: number;

  @Field()
  type: NotificationType;
}
