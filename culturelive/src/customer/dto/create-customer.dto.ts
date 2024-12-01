import {
  IsString,
  IsEmail,
  IsInt,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  first_name: string;

  @IsInt()
  store_id: number;

  @IsString()
  last_name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  address_id: number;

  @IsBoolean()
  @IsOptional()
  activebool?: boolean;

  @IsDateString()
  @IsOptional()
  create_date?: string;
}
