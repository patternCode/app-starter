import {
	IsEmail,
	IsString,
	IsNotEmpty,
	MinLength,
	MaxLength,
} from 'class-validator';
import { IRegisterAuthenticationRequest } from 'shared/src/interfaces/authentication.interface';

export class RegisterAuthenticationDto
	implements IRegisterAuthenticationRequest {
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
	@MinLength(8)
	@MaxLength(255)
	readonly password: string;
}
