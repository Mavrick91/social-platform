import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { PubSubEngine } from 'graphql-subscriptions';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { PaginatedNotifications } from './entities/notification-pagination.entity';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Query(() => PaginatedNotifications, { name: 'notifications' })
  @UseGuards(GqlAuthGuard)
  async findAllNotificationForUser(
    @CurrentUser() user: User,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
  ) {
    return this.notificationService.findAllForUser(user.id, page, limit);
  }

  @Mutation(() => [Notification])
  @UseGuards(GqlAuthGuard)
  async markNotificationsAsRead(
    @Args('notificationIds', { type: () => [Int] }) notificationIds: number[],
  ) {
    return this.notificationService.markAsRead(notificationIds);
  }

  @Subscription(() => Notification, {
    filter: (payload, variables) => {
      return payload.notificationAdded.receiverId === variables.userId;
    },
    resolve: (payload) => {
      return payload.notificationAdded;
    },
    name: 'notificationAdded',
  })
  async notificationAdded(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('notificationAdded');
  }
}
