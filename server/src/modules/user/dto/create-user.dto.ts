import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateUserDto {
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

  @Field()
  @IsNotEmpty({ message: 'Username must not be empty' })
  @Matches(/^[a-zA-Z0-9._]+$/, {
    message:
      'Username can only contain letters, numbers, periods, and underscores',
  })
  @MinLength(1, { message: 'Username must be at least 1 character long' })
  @MaxLength(30, { message: 'Username must be less than 30 characters' })
  username: string;
}
