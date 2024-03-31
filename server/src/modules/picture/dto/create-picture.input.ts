import { InputType, Field } from '@nestjs/graphql';
import { SizeInput } from '../entities/picture.entity';

@InputType()
export class CreatePictureInput {
  @Field({ nullable: true })
  description?: string;

  @Field()
  userId: number;

  @Field(() => SizeInput)
  sizes: SizeInput;

  @Field()
  fileName: string;
}
