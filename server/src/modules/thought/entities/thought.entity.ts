import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Visibility } from '../visibility.enum';

@ObjectType()
export class Thought {
  @Field(() => Int, { description: 'The unique identifier of the thought' })
  id: number;

  @Field()
  content: string;

  @Field(() => User)
  user: User;

  @Field(() => Visibility)
  visibility: Visibility;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
