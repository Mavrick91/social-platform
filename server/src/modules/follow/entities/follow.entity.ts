import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Follow {
  @Field({ nullable: true })
  initiatorId?: number;

  @Field({ nullable: true })
  targetUserId?: number;

  @Field(() => User, { nullable: true })
  initiator?: User;

  @Field(() => User, { nullable: true })
  targetUser?: User;
}
