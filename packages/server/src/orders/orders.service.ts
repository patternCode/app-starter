import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseOrdersDto } from './dto/response.dto';
import { OrdersEntity } from './entities/orders.entity';
/* import { ProductsPaginationDto } from './dto/products-pagination.dto';
import { ProductsResultDto } from './dto/products-result.dto'; */
/* import { UsersEntity } from '../users/entities/users.entity'; */
/* import { UsersInterface } from '../users/interfaces/users.interface'; */
/* import { ResponseProductsDto, UserProductDto } from './dto/response.dto'; */
/* import { PaginationProductsDto } from './dto/pagination.dto'; */

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(OrdersEntity)
		private readonly ordersRespository: Repository<OrdersEntity>,
	) {}

	/* async findAll(paginationDto: PaginationProductsDto): Promise<any> {
		const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

		const totalCount = await this.productsRespository.count();
		const products = await this.productsRespository
			.createQueryBuilder('products')
			.orderBy('products.createdAt', 'DESC')
			.offset(skippedItems)
			.limit(paginationDto.limit)
			.leftJoinAndSelect('products.users', 'users_id')
			.getMany();

		'products', products);

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
		});

		'reducedUsers', payloadProducts);

		return {
			total_count: totalCount,
			page: paginationDto.page,
			limit: paginationDto.limit,
			products: payloadProducts,
		};
	} */

	async create(ordersDto: OrdersEntity): Promise<OrdersEntity> {
		return this.ordersRespository.save(ordersDto);
	}

	async response(
		status: HttpStatus,
		order: OrdersEntity,
	): Promise<ResponseOrdersDto> {
		return {
			status: status,
			order: order,
		};
	}
}
