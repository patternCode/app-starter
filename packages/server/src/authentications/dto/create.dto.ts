import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { UsersEntity } from '../../users/entities/users.entity';

export class CreateAuthenticationDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@MaxLength(255)
	readonly password: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	readonly email_token: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	readonly user: UsersEntity;
}
