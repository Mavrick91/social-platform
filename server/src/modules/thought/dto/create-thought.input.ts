import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Visibility } from '../visibility.enum';

@InputType()
export class CreateThoughtInput {
  @Field()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsNotEmpty()
  userId: number;

  @Field(() => Visibility)
  @IsNotEmpty()
  @IsEnum(Visibility)
  visibility: Visibility;
}
