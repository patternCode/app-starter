import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './_database/_database.module';
import { AuthenticationsModule } from './authentications/authentications.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './_email/_email.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ClientModule } from './_client/_client.module';
import { ClientMiddleware } from './_client/_client.middleware';
import { ClientController } from './_client/_client.controller';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: join(__dirname, '..', '..', '.env'),
			isGlobal: true,
		}),
		/* ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'client'),
			serveRoot: '',
			renderPath: '',
			exclude: ['/api*'],
		}), */
		DatabaseModule,
		EmailModule,
		AuthenticationsModule,
		UsersModule,
		ProductsModule,
		OrdersModule,
		ClientModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(ClientMiddleware).forRoutes(ClientController);
	}
}
