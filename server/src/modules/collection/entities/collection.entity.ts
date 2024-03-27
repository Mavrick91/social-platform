import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { PictureOnCollection } from './picture-on-collection.entity';

@ObjectType()
export class Collection {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  user: User;

  @Field(() => [PictureOnCollection], { defaultValue: [] })
  pictures: PictureOnCollection[];
}
