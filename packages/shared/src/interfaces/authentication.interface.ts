export interface IChangePasswordAuthenticationRequest {
	email: string;
	email_token: string;
	password: string;
	confirm_password: string;
}

export interface IForgotPasswordAuthenticationRequest {
	email: string;
}

export interface ILoginAuthenticationRequest {
	email: string;
	password: string;
}

export interface IVerifyEmailAuthenticationRequest {
	email: string;
	email_token: string;
}

export interface IRegisterAuthenticationRequest {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}
