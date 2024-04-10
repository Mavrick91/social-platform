import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Follow } from '../../follow/entities/follow.entity';
import { Message } from '../../message/entities/message.entity';
import { Picture } from '../../picture/entities/picture.entity';
import { Thought } from '../../thought/entities/thought.entity';
import { Thread } from '../../thread/entities/thread.entity';
import { Collection } from '../../collection/entities/collection.entity';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Notification } from '../../notification/entities/notification.entity';

@ObjectType()
class UserCount {
  @Field(() => Int, { defaultValue: 0 })
  pictures: number;

  @Field(() => Int, { defaultValue: 0 })
  initiatedFollows: number;

  @Field(() => Int, { defaultValue: 0 })
  receivedFollows: number;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => UserCount)
  _count?: UserCount;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  avatarName?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Picture])
  pictures: Picture[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field()
  isMock: boolean;

  @Field(() => [Follow], { name: 'initiatedFollows' })
  initiatedFollows: Follow[];

  @Field(() => [Follow], { name: 'receivedFollows' })
  receivedFollows: Follow[];

  @Field(() => [User], { name: 'closeFriends' })
  closeFriends: User[];

  @Field(() => [User], { name: 'closeFriendsOf' })
  closeFriendsOf: User[];

  @Field(() => [Like])
  likes: Like[];

  @Field(() => [Collection])
  collections: Collection[];

  @Field(() => [Notification], { name: 'sentNotifications' })
  sentNotifications: Notification[];

  @Field(() => [Notification], { name: 'receivedNotifications' })
  receivedNotifications: Notification[];

  @Field(() => Thought, { nullable: true })
  thought?: Thought;

  @Field(() => [Thread])
  threads: Thread[];

  @Field(() => [Message])
  messages: Message[];
}
