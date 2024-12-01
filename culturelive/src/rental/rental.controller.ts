import { Controller, Post, Body } from '@nestjs/common';
import { Rental } from './rental.entity';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  /*
    Make a rental
  */
  @Post()
  async create(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalService.createRental(createRentalDto);
  }
}
