import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { PictureOnCollection } from './picture-on-collection.entity';

@ObjectType()
export class Collection {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  nameId: string;

  @Field({ defaultValue: false })
  isDefault: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  user: User;

  @Field(() => [PictureOnCollection], { defaultValue: [] })
  pictures: PictureOnCollection[];
}
