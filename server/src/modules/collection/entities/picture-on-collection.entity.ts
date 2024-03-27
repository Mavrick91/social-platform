import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Picture } from '../../picture/entities/picture.entity';
import { Collection } from './collection.entity';

@ObjectType()
export class PictureOnCollection {
  @Field(() => Int)
  pictureId: number;

  @Field(() => Picture)
  picture: Picture;

  @Field(() => String)
  collectionId: string;

  @Field(() => Collection)
  collection: Collection;
}
