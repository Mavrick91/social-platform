import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Field()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'First name must not be empty' })
  firstName: string;

  @Field()
  @IsNotEmpty({ message: 'Last name must not be empty' })
  lastName: string;
}
