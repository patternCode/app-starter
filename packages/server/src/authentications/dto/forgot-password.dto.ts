//#region modules
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { IForgotPasswordAuthenticationRequest } from 'shared/src/interfaces/authentication.interface';
//#endregion

export class ForgotPasswordAuthenticationDto
	implements IForgotPasswordAuthenticationRequest {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	readonly email: string;
}
