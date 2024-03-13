import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePictureInput } from './create-picture.input';

@InputType()
export class UpdatePictureInput extends PartialType(CreatePictureInput) {
  @Field({ nullable: true })
  published?: boolean;
}
