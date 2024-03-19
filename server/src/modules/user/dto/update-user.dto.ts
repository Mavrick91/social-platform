import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field()
  @IsNotEmpty({ message: 'First name must not be empty' })
  firstName: string;

  @Field()
  @IsNotEmpty({ message: 'Last name must not be empty' })
  lastName: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  avatarName: string;
}
