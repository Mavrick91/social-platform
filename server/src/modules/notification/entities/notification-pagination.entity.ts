import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Notification } from './notification.entity';

@ObjectType()
export class PaginatedNotifications {
  @Field(() => [Notification])
  notifications: Notification[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}
