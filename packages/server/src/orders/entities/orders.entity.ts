import { Exclude } from 'class-transformer';
import { ProductsEntity } from 'src/products/entities/products.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToMany,
	JoinTable,
	OneToMany,
	ManyToOne,
	JoinColumn,
	OneToOne,
} from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('orders')
export class OrdersEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	/* @OneToMany(() => OrdersItemEntity, orderItem => orderItem.id)
	items: OrdersItemEntity[]; */

	@OneToOne(() => ProductsEntity)
	@JoinColumn({ name: 'product_id' })
	product: ProductsEntity;

	@ManyToOne(() => UsersEntity, users => users.orders)
	@JoinColumn({ name: 'users_id' })
	users: UsersEntity;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
