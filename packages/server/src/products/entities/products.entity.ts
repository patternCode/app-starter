import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('products')
export class ProductsEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		nullable: true,
	})
	slug: string;

	@Column()
	title: string;

	@Column({
		nullable: true,
	})
	description: string;

	@Column({
		nullable: true,
	})
	body: string;

	@Column()
	price: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;

	/* @Column('simple-array')
  tagList: string[]; */

	/* @ManyToMany(type => UsersEntity, user => user.products)
  user: UsersEntity; */

	@ManyToMany(() => UsersEntity, { cascade: true })
	@JoinTable({
		name: 'products_by_users',
		joinColumn: { name: 'products_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'users_id', referencedColumnName: 'id' },
	})
	users: UsersEntity[];

	@Column({
		nullable: true,
	})
	favoriteCount: number;
}
