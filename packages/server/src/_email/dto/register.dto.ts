import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterMailDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly firstname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly email_token: string;
}
