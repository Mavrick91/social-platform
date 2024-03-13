import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Picture {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  data: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => User)
  author: User;

  @Field(() => Int)
  authorId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
