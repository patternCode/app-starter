import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './_email.service';

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: () => ({
				transport: {
					host: process.env.EMAIL_HOST,
					port: process.env.EMAIL_PORT,
					auth: {
						user: process.env.EMAIL_AUTH_USER,
						pass: process.env.EMAIL_AUTH_PASSWORD,
					},
				},
				defaults: {
					from: '"nest-modules" <modules@nestjs.com>',
				},
				template: {
					dir: process.cwd() + '/templates/emails',
					// Template Adapter
					// Usage new PugAdapter() or new EjsAdapter()
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
	],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
