import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Thread {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [User])
  users: User[];

  @Field(() => [Message])
  messages: Message[];
}
