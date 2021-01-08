import {
	Post,
	Get,
	Controller,
	Body,
	Query,
	HttpException,
	HttpStatus,
	UseGuards,
	Req,
	HttpCode,
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
/* import { ProductsPaginationDto } from './dto/products-pagination.dto';
import { ProductsResultDto } from './dto/products-result.dto'; */
import { ResponseOrdersDto } from './dto/response.dto';
import JwtGuard from 'src/authentications/jwt/jwt.guard';
import { CreateOrderDto } from './dto/create.dto';
import { OrdersEntity } from './entities/orders.entity';
import { OrdersService } from './orders.service';

@Controller('api/orders')
export class OrdersController {
	constructor(
		private readonly ordersService: OrdersService,
		private readonly productsService: ProductsService,
		private readonly usersService: UsersService,
	) {}

	/* @Get()
	@HttpCode(HttpStatus.OK)
	async findAll(
		@Query() paginationDto: PaginationProductsDto,
	): Promise<ResponseProductsDto> {
		const query = {
			page: paginationDto.page || 1,
			limit: paginationDto.limit > 20 ? 20 : paginationDto.limit || 20,
		};

		const products = await this.productsService.findAll({
			...query,
		});

		return this.productsService.response(HttpStatus.OK, products);
	} */

	@UseGuards(JwtGuard)
	@Post()
	async create(
		@Req() req,
		@Body() orderDto: CreateOrderDto,
	): Promise<ResponseOrdersDto> {
		const databaseUser = await this.usersService.getById(orderDto.user_id);
		const databaseProduct = await this.productsService.getById(
			orderDto.product_id,
		);

		const createOrder = (orderDto as unknown) as OrdersEntity;
		createOrder.users = databaseUser;
		createOrder.product = databaseProduct;

		const createdOrder = await this.ordersService.create(createOrder);

		return this.ordersService.response(HttpStatus.CREATED, createdOrder);
	}
}
