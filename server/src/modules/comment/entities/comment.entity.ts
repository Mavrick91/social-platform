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
  author: User;

  @Field(() => Int, {
    description: 'The ID of the user who created the comment',
  })
  authorId: number;

  @Field(() => Picture, {
    nullable: true,
    description: 'The picture the comment belongs to',
  })
  picture?: Picture;

  @Field(() => Int, {
    description: 'The ID of the picture the comment belongs to',
  })
  pictureId: number;

  @Field(() => Date, { description: 'The creation date of the comment' })
  createdAt: Date;

  @Field(() => Date, { description: 'The update date of the comment' })
  updatedAt: Date;
}
