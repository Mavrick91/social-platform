import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePictureInput {
  @Field({ nullable: true })
  description?: string;

  @Field()
  userId: number;

  @Field()
  fileUrl: string;

  @Field()
  fileName: string;
}
