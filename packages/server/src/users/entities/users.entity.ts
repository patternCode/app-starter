import { Exclude } from 'class-transformer';
import { OrdersEntity } from 'src/orders/entities/orders.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	firstname: string;

	@Column()
	lastname: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column({
		type: 'text',
		nullable: true,
		select: false,
	})
	public refresh_token?: string;

	@OneToMany(() => OrdersEntity, orders => orders.id)
	orders: OrdersEntity[];

	@CreateDateColumn({
		select: false,
	})
	createdAt: Date;

	@UpdateDateColumn({
		select: false,
	})
	updatedAt: Date;

	@DeleteDateColumn({
		select: false,
	})
	deletedAt: Date;
}
