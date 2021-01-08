import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UsersEntity)
		private usersRepository: Repository<UsersEntity>,
	) {}

	async getByEmail(email: string): Promise<UsersEntity> {
		const databaseUser = await this.usersRepository.findOne({ email });
		if (databaseUser) {
			return databaseUser;
		}
		throw new HttpException(
			{
				status: HttpStatus.NOT_FOUND,
				error: 'Email not found',
			},
			HttpStatus.NOT_FOUND,
		);
	}

	async getById(id: string): Promise<UsersEntity> {
		const databaseUser = await this.usersRepository.findOne({ id });
		if (databaseUser) {
			return databaseUser;
		}
		throw new HttpException(
			{
				status: HttpStatus.NOT_FOUND,
				error: 'User not found',
			},
			HttpStatus.NOT_FOUND,
		);
	}

	async voidByEmail(email: string): Promise<void> {
		const databaseUser = await this.usersRepository.findOne({ email });
		if (databaseUser) {
			throw new HttpException(
				{
					status: HttpStatus.CONFLICT,
					error: 'Email already exists',
				},
				HttpStatus.CONFLICT,
			);
		}
	}

	async update(id: string, updateData: UpdateUserDto): Promise<void> {
		try {
			await this.usersRepository.update(id, updateData);
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

	async create(userData: CreateUserDto): Promise<UsersEntity> {
		try {
			const createdUser = await this.usersRepository.create(userData);
			await this.usersRepository.save(createdUser);
			return createdUser;
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
}
