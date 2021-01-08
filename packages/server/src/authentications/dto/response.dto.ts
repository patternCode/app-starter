import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ResponseUserDto } from 'src/users/dto/response.dto';

export class ResponseAuthenticationDto {
	@IsNotEmpty()
	@IsNumber()
	@MaxLength(3)
	readonly status: number;

	readonly user: ResponseUserDto;
}
