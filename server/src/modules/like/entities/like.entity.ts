import { Field, ObjectType } from '@nestjs/graphql';
import { Picture, User } from '@prisma/client';
import { Picture as PictureModel } from 'src/modules/picture/entities/picture.entity';
import { User as UserModel } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Like {
  @Field()
  id: number;

  @Field()
  userId: number;

  @Field()
  pictureId: number;

  @Field(() => UserModel)
  user: User;

  @Field(() => PictureModel)
  picture: Picture;
}
