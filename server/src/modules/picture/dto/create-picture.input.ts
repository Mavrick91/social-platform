import { InputType, Field } from '@nestjs/graphql';
import { SizeInput } from '../entities/picture.entity';

@InputType()
export class CreatePictureInput {
  @Field(() => SizeInput)
  sizes: SizeInput;

  @Field()
  fileName: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  altText?: string;

  @Field({ defaultValue: false })
  hideLikesAndViewCounts: boolean;

  @Field({ defaultValue: false })
  disableComments: boolean;
}
