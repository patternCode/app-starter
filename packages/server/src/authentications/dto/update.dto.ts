import { IsDate, IsOptional } from 'class-validator';

export class UpdateAuthenticationDto {
	@IsOptional()
	readonly email_token: string | null;

	@IsOptional()
	@IsDate()
	readonly email_verified: Date;

	@IsOptional()
	readonly password?: string;
}
