import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../like/entities/like.entity';

@ObjectType()
class PictureCount {
  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  likes: number;
}

@InputType('SizeInput')
export class SizeInput {
  @Field()
  thumbnail: string;

  @Field()
  original: string;

  @Field()
  medium: string;

  @Field()
  small: string;
}

@ObjectType('SizeType')
export class SizeType {
  @Field()
  thumbnail: string;

  @Field()
  original: string;

  @Field()
  medium: string;

  @Field()
  small: string;
}

@ObjectType()
export class Picture {
  @Field(() => Int)
  id: number;

  @Field(() => SizeType)
  sizes: SizeType;

  @Field()
  fileName: string;

  @Field({ defaultValue: '' })
  altText: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => User)
  user: User;

  @Field(() => [Like], { defaultValue: [] })
  likes: Like[];

  @Field(() => [Comment], { defaultValue: [] })
  comments: Comment[];

  @Field(() => PictureCount)
  _count: PictureCount;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
