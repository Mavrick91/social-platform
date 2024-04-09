import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Visibility } from '../visibility.enum';

@InputType()
export class UpdateThoughtInput {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  content: string;

  @Field(() => Visibility)
  @IsNotEmpty()
  @IsEnum(Visibility)
  visibility: Visibility;
}
