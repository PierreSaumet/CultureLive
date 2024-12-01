import { IsInt, IsDateString } from 'class-validator';

export class CreateRentalDto {
  @IsInt()
  film_id: number;

  @IsDateString()
  rental_date: string;

  @IsInt()
  customer_id: number;

  @IsDateString()
  return_date: string;
}
