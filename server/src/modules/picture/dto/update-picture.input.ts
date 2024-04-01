import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePictureInput {
  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  altText?: string;

  @Field({ nullable: true })
  disableComments?: boolean;

  @Field({ nullable: true })
  hideLikesAndViewCounts?: boolean;
}
