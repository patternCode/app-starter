import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthenticationsService } from '../authentications.service';
import { UserRequest } from '../dto/user-request.dto';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh-token',
) {
	constructor(
		private readonly configService: ConfigService,
		private authenticationsService: AuthenticationsService,
	) {
		super({
			// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.headers?.refresh_authorization as string;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: UserRequest) {
		const refreshToken = request?.headers?.refresh_authorization as string;
		return this.authenticationsService.getRefreshAuthenticatedUser(
			refreshToken,
			payload.user,
		);
	}
}
