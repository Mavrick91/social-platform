import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Picture } from '../../picture/entities/picture.entity';

@ObjectType()
export class Comment {
  @Field(() => Int, { description: 'The unique identifier of the comment' })
  id: number;

  @Field(() => String, { description: 'The content of the comment' })
  content: string;

  @Field(() => User, {
    description: 'The user who created the comment',
  })
  user: User;

  @Field(() => Int, {
    nullable: true,
  })
  userId?: number;

  @Field(() => Picture, {
    nullable: true,
    description: 'The picture the comment belongs to',
  })
  picture?: Picture;

  @Field(() => Int, {
    nullable: true,
  })
  pictureId?: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
