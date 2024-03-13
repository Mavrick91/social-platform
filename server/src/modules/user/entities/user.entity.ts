import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Picture } from '../../picture/entities/picture.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => [Picture])
  pictures: Picture[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
