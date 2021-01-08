import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import JwtGuard from './authentications/jwt/jwt.guard';

@Controller('api')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('status')
	status(): string {
		return this.appService.getHello();
	}

	@Get('secure')
	@UseGuards(JwtGuard)
	secure(): string {
		return this.appService.getHello();
	}
}
