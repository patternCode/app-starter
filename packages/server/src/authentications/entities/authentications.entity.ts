import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('authentications')
export class AuthenticationsEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		length: 255,
		nullable: true,
	})
	email_token: string;

	@Column({
		nullable: true,
	})
	email_verified: Date;

	@Column({ length: 255 })
	@Exclude()
	password: string;

	@OneToOne(() => UsersEntity)
	@JoinColumn({ name: 'users_id' })
	@Exclude()
	user: UsersEntity;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
