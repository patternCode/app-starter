import { HttpStatus, Injectable } from '@nestjs/common';
import { ProductsEntity } from './entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
/* import { ProductsPaginationDto } from './dto/products-pagination.dto';
import { ProductsResultDto } from './dto/products-result.dto'; */
import { UsersEntity } from '../users/entities/users.entity';
/* import { UsersInterface } from '../users/interfaces/users.interface'; */
import {
	ProductDto,
	ProductInterface,
	ProductsDto,
	ResponseProductsDto,
	UserProductDto,
} from './dto/response.dto';
import { PaginationProductsDto } from './dto/pagination.dto';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(ProductsEntity)
		private readonly productsRespository: Repository<ProductsEntity>,
	) {}

	async getById(id: string): Promise<any> {
		await this.productsRespository.findOne({ id });
	}

	async findAll(paginationDto: PaginationProductsDto): Promise<ProductsDto> {
		const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

		const totalCount = await this.productsRespository.count();
		const products = await this.productsRespository
			.createQueryBuilder('products')
			.orderBy('products.createdAt', 'DESC')
			.offset(skippedItems)
			.limit(paginationDto.limit)
			.leftJoinAndSelect('products.users', 'users_id')
			.getMany();

		const payloadProducts = products.map(product => {
			const { users, ...rest } = product;

			const reducedUsers = users.map(user => {
				return {
					id: user.id,
					firstname: user.firstname,
					lastname: user.lastname,
				} as UserProductDto;
			});
			return {
				users: reducedUsers,
				...rest,
			};
		}) as ProductInterface[];

		return {
			total_count: totalCount,
			page: paginationDto.page,
			limit: paginationDto.limit,
			products: payloadProducts,
		};
	}

	async create(productDto: ProductsEntity): Promise<ProductInterface> {
		const createdProduct = await this.productsRespository.save(productDto);
		const { users, ...rest } = createdProduct;
		const reducedUsers = users.map(user => {
			return {
				id: user.id,
				firstname: user.firstname,
				lastname: user.lastname,
			} as UserProductDto;
		});

		const payloadProudct = {
			...rest,
			users: reducedUsers,
		} as ProductInterface;

		return payloadProudct;
	}

	async response(
		status: HttpStatus,
		data?: ProductDto | ProductsDto,
	): Promise<ResponseProductsDto> {
		return {
			status: status,
			...data,
		};
	}
}
