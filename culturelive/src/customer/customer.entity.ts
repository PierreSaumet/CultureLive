import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  store_id: number;

  @Column({ length: 45 })
  first_name: string;

  @Column({ length: 45 })
  last_name: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column()
  address_id: number;

  @Column({ default: true })
  activebool: boolean;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_date: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  last_update: Date;

  @Column({ nullable: true })
  active: number;

  @Column({ default: 0 })
  timezone: number;
}
