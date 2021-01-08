//#region modules
import { IsNumber, IsOptional } from 'class-validator';
//#endregion

export class PaginationProductsDto {
	@IsOptional()
	@IsNumber()
	readonly page: number;

	@IsOptional()
	@IsNumber()
	readonly limit: number;
}
