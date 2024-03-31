import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePictureInput {
  @Field({ nullable: true })
  description?: string;
}
