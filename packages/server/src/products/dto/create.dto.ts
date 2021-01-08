import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class CreateProductDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	readonly title: string;

	@IsNotEmpty()
	@IsNumber()
	readonly price: number;

	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	readonly user_id: string;
}
