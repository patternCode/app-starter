import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class CreateOrderDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	readonly product_id: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	readonly user_id: string;
}
