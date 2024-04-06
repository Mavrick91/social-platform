import { Field, ObjectType } from '@nestjs/graphql';
import { NotificationType } from '@prisma/client';

@ObjectType()
export class NotificationUser {
  @Field()
  id: number;

  @Field()
  type: NotificationType;
}
