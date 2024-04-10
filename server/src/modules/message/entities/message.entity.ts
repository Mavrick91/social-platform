import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Thread } from '../../thread/entities/thread.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  content: string;

  @Field(() => User)
  user: User;

  @Field(() => Thread)
  thread: Thread;
}
