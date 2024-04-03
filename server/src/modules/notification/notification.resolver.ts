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

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Query(() => [Notification], { name: 'notifications' })
  @UseGuards(GqlAuthGuard)
  async findAllNotificationForUser(@CurrentUser() user: User) {
    return this.notificationService.findAllForUser(user.id);
  }

  @Mutation(() => [Notification])
  @UseGuards(GqlAuthGuard)
  async markNotificationsAsRead(
    @Args('notificationIds', { type: () => [Int] }) notificationIds: number[],
  ) {
    return this.notificationService.markAsRead(notificationIds);
  }

  @Subscription(() => Notification, {
    filter: (payload, variables) =>
      payload.notificationAdded.receiverId === variables.userId,
    resolve: (payload) => payload.notificationAdded,
  })
  notificationAdded(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('notificationAdded');
  }
}
