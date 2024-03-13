import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePictureInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  authorId: number;

  @Field()
  data: string;
}
