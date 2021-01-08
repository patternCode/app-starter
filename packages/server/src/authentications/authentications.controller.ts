import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/_email/_email.service';
import { AuthenticationsService } from './authentications.service';
import { CreateUserDto } from 'src/users/dto/create.dto';
import { CreateAuthenticationDto } from './dto/create.dto';
import { ResponseAuthenticationDto } from './dto/response.dto';
import { VerifyEmailAuthenticationDto } from './dto/verifiy-email.dto';
import { UpdateAuthenticationDto } from './dto/update.dto';
import { ForgotPasswordAuthenticationDto } from './dto/forgot-password.dto';
import { ChangePasswordAuthenticationDto } from './dto/change-password.dto';
import { LocalGuard } from './local/local.guard';
import { UserRequest } from './dto/user-request.dto';
import { UpdateUserDto } from 'src/users/dto/update.dto';
import JwtRefreshGuard from './jwt/jwt.refresh.guard';
import { RegisterAuthenticationDto } from './dto/register.dto';

@Controller('api/authentication')
export class AuthenticationsController {
	constructor(
		private readonly authenticationsService: AuthenticationsService,
		private readonly usersService: UsersService,
		private readonly _emailService: EmailService,
	) {}

	@Get('refresh')
	@UseGuards(JwtRefreshGuard)
	@HttpCode(HttpStatus.OK)
	public async refresh(@Req() request: UserRequest) {
		const user = request.user;
		const accessToken = await this.authenticationsService.signJwt(user);
		request.res.setHeader('Authorization', accessToken);
		return this.authenticationsService.response(HttpStatus.OK, user);
	}

	@Put('change-password')
	@HttpCode(HttpStatus.OK)
	public async changePassword(
		@Body() changePasswordDto: ChangePasswordAuthenticationDto,
	): Promise<ResponseAuthenticationDto> {
		const databaseAuthentication = await this.authenticationsService.getByEmail(
			changePasswordDto.email,
		);

		await this.authenticationsService.emailUnVerified(
			databaseAuthentication.email_verified,
		);

		await this.authenticationsService.compareData(
			changePasswordDto.email_token,
			databaseAuthentication.email_token,
			'email_token',
		);

		await this.authenticationsService.compareData(
			changePasswordDto.password,
			changePasswordDto.confirm_password,
			'password',
		);

		const hashedPassword = await this.authenticationsService.hashPassword(
			changePasswordDto.password,
		);

		const updateAuthentication: UpdateAuthenticationDto = {
			password: hashedPassword,
			email_token: null,
			email_verified: new Date(),
		};

		await this.authenticationsService.update(
			databaseAuthentication.id,
			updateAuthentication,
		);

		const payloadUser = {
			firstname: databaseAuthentication.user.firstname,
			lastname: databaseAuthentication.user.lastname,
			email: databaseAuthentication.user.email,
		};

		return this.authenticationsService.response(HttpStatus.OK, payloadUser);
	}

	@Put('forgot-password')
	@HttpCode(HttpStatus.OK)
	public async forgotPassword(
		@Body() forgotPasswordDto: ForgotPasswordAuthenticationDto,
	): Promise<ResponseAuthenticationDto> {
		const databaseAuthentication = await this.authenticationsService.getByEmail(
			forgotPasswordDto.email,
		);

		const emailToken = await uuidv4();
		const updateAuthentication: UpdateAuthenticationDto = {
			email_token: emailToken,
			email_verified: null,
		};

		await this.authenticationsService.update(
			databaseAuthentication.id,
			updateAuthentication,
		);

		const createMailer = {
			...databaseAuthentication.user,
			email_token: updateAuthentication.email_token,
		};
		this._emailService.sendMailForgotPassword(createMailer);

		const payloadUser = {
			email: databaseAuthentication.user.email,
		};

		return this.authenticationsService.response(HttpStatus.OK, payloadUser);
	}

	@Post('login')
	@UseGuards(LocalGuard)
	@HttpCode(HttpStatus.OK)
	public async login(@Req() request: UserRequest): Promise<any> {
		const user = request.user;
		const accessToken = await this.authenticationsService.signJwt(user);
		const refreshToken = await this.authenticationsService.signJwtRefreshToken(
			user,
		);

		const updateUser: UpdateUserDto = {
			refresh_token: refreshToken,
		};

		await this.usersService.update(user.id, updateUser);
		request.res.setHeader('Authorization', accessToken);
		request.res.setHeader('Refresh_Authorization', refreshToken);
		return this.authenticationsService.response(HttpStatus.OK, user);
	}

	@Put('verify-email')
	@HttpCode(HttpStatus.OK)
	public async verifyEmail(
		@Body() verifyEmailDto: VerifyEmailAuthenticationDto,
	): Promise<ResponseAuthenticationDto> {
		const databaseAuthentication = await this.authenticationsService.getByEmail(
			verifyEmailDto.email,
		);

		await this.authenticationsService.emailUnVerified(
			databaseAuthentication.email_verified,
		);

		await this.authenticationsService.compareData(
			verifyEmailDto.email_token,
			databaseAuthentication.email_token,
			'email_token',
		);

		const updateAuthentication: UpdateAuthenticationDto = {
			email_token: null,
			email_verified: new Date(),
		};

		await this.authenticationsService.update(
			databaseAuthentication.id,
			updateAuthentication,
		);

		const payloadUser = {
			firstname: databaseAuthentication.user.firstname,
			lastname: databaseAuthentication.user.lastname,
			email: databaseAuthentication.user.email,
		};

		return this.authenticationsService.response(HttpStatus.OK, payloadUser);
	}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(
		@Body() registerDto: RegisterAuthenticationDto,
	): Promise<ResponseAuthenticationDto> {
		await this.usersService.voidByEmail(registerDto.email);

		const createUser: CreateUserDto = {
			firstname: registerDto.firstname,
			lastname: registerDto.lastname,
			email: registerDto.email,
		};
		const createdUser = await this.usersService.create(createUser);

		const hashedPassword = await this.authenticationsService.hashPassword(
			registerDto.password,
		);
		const emailToken = await uuidv4();
		const createAuthentication: CreateAuthenticationDto = {
			password: hashedPassword,
			email_token: emailToken,
			user: createdUser,
		};
		await this.authenticationsService.create(createAuthentication);

		const createMailer = {
			...createUser,
			email_token: createAuthentication.email_token,
		};
		this._emailService.sendMailRegister(createMailer);

		const payloadUser = {
			firstname: createdUser.firstname,
			lastname: createdUser.lastname,
			email: createdUser.email,
		};

		return this.authenticationsService.response(
			HttpStatus.CREATED,
			payloadUser,
		);
	}
}
