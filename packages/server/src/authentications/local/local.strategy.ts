import { Body, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationsService } from '../authentications.service';
import { ResponseUserDto } from 'src/users/dto/response.dto';
import { LoginAuthenticationDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authenticationsService: AuthenticationsService) {
		super({
			usernameField: 'email',
		});
	}

	async validate(email: string, password: string): Promise<ResponseUserDto> {
		return this.authenticationsService.getAuthenticatedUser(email, password);
	}
}
