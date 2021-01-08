import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	readonly firstname?: string;

	@IsOptional()
	readonly lastname?: string;

	@IsOptional()
	@IsEmail()
	readonly email?: string;

	@IsOptional()
	readonly refresh_token?: string;
}
