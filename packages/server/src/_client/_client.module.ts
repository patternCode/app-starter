import { Module } from '@nestjs/common';
import { ClientController } from './_client.controller';
import { ClientService } from './_client.service';

@Module({
	controllers: [ClientController],
	providers: [ClientService],
	exports: [ClientService],
})
export class ClientModule {}
