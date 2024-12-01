import {
  IsString,
  IsEmail,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  first_name: string;

  @IsInt()
  @IsOptional()
  store_id: number;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  @IsOptional()
  address_id: number;

  @IsBoolean()
  @IsOptional()
  activebool?: boolean;
}
