import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  content: string;

  @Field()
  userId: number;

  @Field()
  threadId: number;
}
