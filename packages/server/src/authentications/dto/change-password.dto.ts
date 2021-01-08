//#region modules
import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { IChangePasswordAuthenticationRequest } from 'shared/src/interfaces/authentication.interface';
//#endregion

export class ChangePasswordAuthenticationDto
	implements IChangePasswordAuthenticationRequest {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	readonly email_token: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	readonly password: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	readonly confirm_password: string;
}
