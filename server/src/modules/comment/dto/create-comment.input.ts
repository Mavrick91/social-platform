import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { description: 'The content of the comment' })
  content: string;

  @Field(() => Int, {
    description: 'The ID of the user who created the comment',
  })
  userId: number;

  @Field(() => Int, {
    description: 'The ID of the picture the comment belongs to',
  })
  pictureId: number;
}
