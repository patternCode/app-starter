import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthenticationDto } from './dto/create.dto';
import { ResponseAuthenticationDto } from './dto/response.dto';
import { ResponseUserDto } from 'src/users/dto/response.dto';
import { AuthenticationsEntity } from './entities/authentications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAuthenticationDto } from './dto/update.dto';

@Injectable()
export class AuthenticationsService {
	constructor(
		@InjectRepository(AuthenticationsEntity)
		private authenticationsRepository: Repository<AuthenticationsEntity>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	public async signJwt(user: ResponseUserDto): Promise<string> {
		const token = this.jwtService.sign(
			{ ...user },
			{
				secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
				expiresIn: `${this.configService.get<string>(
					'JWT_ACCESS_TOKEN_EXPIRES_IN',
				)}`,
			},
		);
		return token;
	}

	public async signJwtRefreshToken(user: ResponseUserDto): Promise<string> {
		const token = this.jwtService.sign(
			{ ...user },
			{
				secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
				expiresIn: `${this.configService.get<string>(
					'JWT_REFRESH_TOKEN_EXPIRES_IN',
				)}`,
			},
		);
		return token;
	}

	public async getByUserId(id: string): Promise<AuthenticationsEntity> {
		try {
			return await this.authenticationsRepository
				.createQueryBuilder('authentication')
				.innerJoinAndSelect('authentication.user', 'user')
				.where('user.id = :value', { value: id })
				.getOneOrFail();
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.UNAUTHORIZED,
					error: 'Wrong credentials',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
	}

	async getByEmail(email: string): Promise<AuthenticationsEntity> {
		const databaseAuthentication = await this.authenticationsRepository
			.createQueryBuilder('authentication')
			.innerJoinAndSelect('authentication.user', 'users')
			.where('users.email = :value', { value: email })
			.getOneOrFail();

		if (databaseAuthentication) {
			return databaseAuthentication;
		}
		throw new HttpException(
			{
				status: HttpStatus.NOT_FOUND,
				error: 'Email not found',
			},
			HttpStatus.NOT_FOUND,
		);
	}

	async getRefreshAuthenticatedUser(
		refreshToken: string,
		user: ResponseUserDto,
	): Promise<ResponseUserDto> {
		const databaseAuthentication = await this.getByUserId(user.id);

		await this.compareData(
			refreshToken,
			databaseAuthentication.user.refresh_token,
			'refresh_token',
		);

		return databaseAuthentication.user;
	}

	public async getAuthenticatedUser(
		email: string,
		password: string,
	): Promise<ResponseUserDto> {
		try {
			const databaseAuthentication = await this.getByEmail(email);

			await this.emailVerified(databaseAuthentication.email_verified);
			await this.comparePassword(password, databaseAuthentication.password);

			return databaseAuthentication.user;
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.UNAUTHORIZED,
					error: `Wrong credentials`,
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
	}

	public async emailVerified(email_verified: Date): Promise<void> {
		if (email_verified !== null) {
			return Promise.resolve();
		}
		throw new HttpException(
			{
				status: HttpStatus.UNAUTHORIZED,
				error: `Email not verified`,
			},
			HttpStatus.UNAUTHORIZED,
		);
	}

	public async emailUnVerified(email_verified: Date): Promise<void> {
		if (email_verified === null) {
			return Promise.resolve();
		}
		throw new HttpException(
			{
				status: HttpStatus.FORBIDDEN,
				error: 'Email already verified',
			},
			HttpStatus.FORBIDDEN,
		);
	}

	public async compareData(
		firstData: string,
		secondData: string,
		name?: string,
	): Promise<void> {
		if (firstData === secondData) {
			return Promise.resolve();
		}
		throw new HttpException(
			{
				status: HttpStatus.BAD_REQUEST,
				error: `Compairing #${name} failed`,
			},
			HttpStatus.BAD_REQUEST,
		);
	}

	public async hashPassword(password: string): Promise<string> {
		try {
			return bcrypt.hash(password, 10);
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Internal server error',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	public async comparePassword(
		requestPassword: string,
		databasePassword: string,
	): Promise<void> {
		const comparedPassword = await bcrypt.compare(
			requestPassword,
			databasePassword,
		);
		if (comparedPassword) {
			return Promise.resolve();
		}
		throw new HttpException(
			{
				status: HttpStatus.UNAUTHORIZED,
				error: `Wrong credentials`,
			},
			HttpStatus.UNAUTHORIZED,
		);
	}

	async update(id: string, updateData: UpdateAuthenticationDto): Promise<void> {
		try {
			await this.authenticationsRepository.update(id, updateData);
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Internal server error',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async create(
		authenticationData: CreateAuthenticationDto,
	): Promise<AuthenticationsEntity> {
		try {
			const createAuthentication = await this.authenticationsRepository.create(
				authenticationData,
			);
			await this.authenticationsRepository.save(createAuthentication);
			return createAuthentication;
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Internal server error',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async response(
		status: HttpStatus,
		user: ResponseUserDto,
	): Promise<ResponseAuthenticationDto> {
		return {
			status: status,
			user: {
				id: user.id,
				email: user.email,
				firstname: user.firstname,
				lastname: user.lastname,
			},
		};
	}
}
