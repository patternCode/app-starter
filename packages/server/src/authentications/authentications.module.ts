import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationsEntity } from './entities/authentications.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';
import { EmailService } from 'src/_email/_email.service';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtRefreshStrategy } from './jwt/jwt-refresh.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([AuthenticationsEntity, UsersEntity]),
		ConfigModule,
		PassportModule,
		JwtModule.register({}),
		UsersModule,
	],
	controllers: [AuthenticationsController],
	providers: [
		AuthenticationsService,
		EmailService,
		LocalStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
	],
	exports: [AuthenticationsService],
})
export class AuthenticationsModule {}
