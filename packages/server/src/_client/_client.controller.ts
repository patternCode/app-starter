import { Controller, Get, Req } from '@nestjs/common';
import { ClientService } from './_client.service';

@Controller()
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Get('*')
	public async get(@Req() res) {
		return this.clientService.getApp(res);
	}

	/* @Get('sitemap.xml')
  @Header('Content-Type', 'application/xml')
  public async getSiteMap() {
    return this.clientService.getSitemap();
  } */
}
