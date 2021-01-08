import {
	IsEmail,
	IsString,
	IsNotEmpty,
	MaxLength,
} from 'class-validator';

export class CreateUserDto {
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
}
