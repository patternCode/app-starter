import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationsService } from '../authentications.service';
import { UserRequest } from '../dto/user-request.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private authenticationsService: AuthenticationsService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
		});
	}

	async validate(payload: UserRequest) {
		return this.authenticationsService.getByUserId(payload.user.id);
	}
}
