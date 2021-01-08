import {
	IsEmail,
	IsString,
	IsNotEmpty,
	MinLength,
	MaxLength,
} from 'class-validator';
import { ILoginAuthenticationRequest } from 'shared/src/interfaces/authentication.interface';

export class LoginAuthenticationDto implements ILoginAuthenticationRequest {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@MaxLength(255)
	readonly password: string;
}
