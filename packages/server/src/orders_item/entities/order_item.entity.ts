/* import { OrdersEntity } from 'src/orders/entities/orders.entity';
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
	ManyToOne,
	JoinColumn,
	OneToOne,
} from 'typeorm';

@Entity('orders_item')
export class OrdersItemEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => ProductsEntity)
	@JoinColumn({ name: 'product_id' })
	product: ProductsEntity;

	@Column({
		default: 1,
	})
	quantity: number;

	@ManyToOne(() => OrdersEntity, orders => orders.items)
	@JoinColumn({ name: 'order_id' })
	order: OrdersEntity;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
} */
