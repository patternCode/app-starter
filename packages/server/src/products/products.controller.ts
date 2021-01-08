import {
	Post,
	Get,
	Controller,
	Body,
	Query,
	HttpStatus,
	UseGuards,
	Req,
	HttpCode,
} from '@nestjs/common';
import { ProductsEntity } from './entities/products.entity';
import { ProductsService } from './products.service';
import { UsersService } from '../users/users.service';
/* import { ProductsPaginationDto } from './dto/products-pagination.dto';
import { ProductsResultDto } from './dto/products-result.dto'; */
import {
	ProductDto,
	ProductsDto,
	ResponseProductsDto,
} from './dto/response.dto';
import JwtGuard from 'src/authentications/jwt/jwt.guard';
import { CreateProductDto } from './dto/create.dto';
import { PaginationProductsDto } from './dto/pagination.dto';

@Controller('api/products')
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private readonly usersService: UsersService,
	) {}

	@Get()
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
		const payloadProducts = {
			...products,
		} as ProductsDto;

		return this.productsService.response(HttpStatus.OK, payloadProducts);
	}

	@Post()
	@UseGuards(JwtGuard)
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Req() req,
		@Body() productDto: CreateProductDto,
	): Promise<ResponseProductsDto> {
		const databaseUser = await this.usersService.getById(productDto.user_id);

		const createProduct = (productDto as unknown) as ProductsEntity;
		createProduct.users = [databaseUser];

		const createdProduct = await this.productsService.create(createProduct);
		const payloadProduct = {
			product: {
				...createdProduct,
			},
		} as ProductDto;

		return this.productsService.response(HttpStatus.CREATED, payloadProduct);
	}
}
