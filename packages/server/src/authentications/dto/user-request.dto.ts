import { Request } from 'express';
import { UsersEntity } from '../../users/entities/users.entity';

export interface UserRequest extends Request {
	user: UsersEntity;
}
