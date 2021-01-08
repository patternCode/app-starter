import {
	IsNotEmpty,
	MaxLength,
	IsNumber,
	IsString,
	IsOptional,
} from 'class-validator';

export interface UserProductDto {
	id: string;
	firstname: string;
	lastname: string;
}

export interface ProductInterface {
	id: string;
	slug: string | null;
	title: string | null;
	description: string | null;
	body: string | null;
	price: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	favoriteCount: number | null;
	users: UserProductDto[];
}

export interface ProductDto {
	product: ProductInterface;
}

export interface ProductsDto {
	readonly total_count?: number;
	readonly page?: number;
	readonly limit?: number;
	readonly products?: ProductInterface[];
}

export interface ResponseProductsDto {
	readonly status: number;

	readonly total_count?: number;

	readonly page?: number;

	readonly limit?: number;

	readonly product?: ProductInterface;

	readonly products?: ProductInterface[];
}
