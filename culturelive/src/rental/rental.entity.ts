import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rental')
export class Rental {
  @PrimaryGeneratedColumn()
  rental_id: number;

  @Column({ type: 'timestamp' })
  rental_date: Date;

  @Column({ default: 1 })
  inventory_id: number;

  @Column()
  customer_id: number;

  @Column({ type: 'timestamp', nullable: true })
  return_date: Date;

  @Column({ default: 1 })
  staff_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update: Date;
}
