import { IsOptional } from 'class-validator';

export class ResponseUserDto {
	@IsOptional()
	readonly id?: string;

	@IsOptional()
	readonly email?: string;

	@IsOptional()
	readonly firstname?: string;

	@IsOptional()
	readonly lastname?: string;
}
