import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateThreadInput {
  @Field(() => [Number])
  userIds: number[];
}
