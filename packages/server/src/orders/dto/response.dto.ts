import {
	IsNotEmpty,
	MaxLength,
	IsNumber,
	IsString,
	IsOptional,
} from 'class-validator';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { OrdersEntity } from '../entities/orders.entity';

export interface UserOrderDto {
	id: string;
	firstname: string;
	lastname: string;
}

interface ProductDto {
	id: string;
	slug: string | null;
	title: string | null;
	description: string | null;
	body: string | null;
	price: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

class OrderDto {
	@IsNotEmpty()
	@IsString()
	id: string;

	@IsOptional()
	product: ProductsEntity;

	@IsOptional()
	user: UserOrderDto[];
}

export class ResponseOrdersDto {
	@IsNotEmpty()
	@IsNumber()
	@MaxLength(3)
	readonly status: number;

	readonly order?: OrdersEntity;

	readonly orders?: OrderDto[];
}
