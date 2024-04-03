import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  read?: boolean;
}
