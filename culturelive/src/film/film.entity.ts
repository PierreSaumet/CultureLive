import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum mpaa_Rating {
  'G',
  'PG',
  'PG-13',
  'R',
  'NC-17',
}

@Entity('film')
export class Film {
  @PrimaryGeneratedColumn()
  film_id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'smallint', nullable: true })
  release_year: number;

  @Column()
  language_id: number;

  @Column({ nullable: true })
  original_language_id: number;

  @Column({ default: 3 })
  rental_duration: number;

  @Column({ type: 'numeric', precision: 4, scale: 2, default: 4.99 })
  rental_rate: number;

  @Column({ type: 'smallint', nullable: true })
  length: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 19.99 })
  replacement_cost: number;

  @Column({
    type: 'enum',
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
    enumName: 'mpaa_rating',
    default: 'G',
  })
  rating: mpaa_Rating;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update: Date;

  @Column({ type: 'text', nullable: true, array: true })
  special_features: string[];

  @Column({ type: 'tsvector', nullable: false })
  fulltext: string;
}
