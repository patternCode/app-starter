//#region modules
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { IVerifyEmailAuthenticationRequest } from 'shared/src/interfaces/authentication.interface';
//#endregion

export class VerifyEmailAuthenticationDto
	implements IVerifyEmailAuthenticationRequest {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	readonly email_token: string;
}
