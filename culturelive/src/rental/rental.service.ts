import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { CustomerService } from 'src/customer/customer.service';
import { FilmService } from 'src/film/film.service';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,

    private customerService: CustomerService,

    private filmService: FilmService,
  ) {}

  /*
    Return all rentals
  */
  async findAll(): Promise<Rental[]> {
    return this.rentalRepository.find();
  }
  /*
    Create a new rental and save it in the database.
    Return new rental
  */
  async createRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    // Get consumer
    const customer = await this.customerService.findOneById(
      createRentalDto.customer_id,
    );

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Get Film
    const film = await this.filmService.findOneById(createRentalDto.film_id);

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    // Get customer timezone
    const timezone_C = customer.timezone;

    // Convert string to date
    const rentalDate = new Date(createRentalDto.rental_date);
    const returnDate = new Date(createRentalDto.return_date);

    // Add Customer Timezone
    rentalDate.setHours(rentalDate.getHours() + timezone_C);
    returnDate.setHours(returnDate.getHours() + timezone_C);

    // Get millisecond diff
    const diffTime = returnDate.getTime() - rentalDate.getTime();

    // Cjhec diff in days
    const diffDay = diffTime / (1000 * 3600 * 24);
    if (diffDay < 7 || diffDay > 21) {
      throw new BadRequestException(
        'A rental must be min 7 days and max 21 days.',
      );
    }

    // Set correct return and rental
    createRentalDto.rental_date = rentalDate.toISOString();
    createRentalDto.return_date = returnDate.toISOString();

    // Finally
    const newRental = this.rentalRepository.create(createRentalDto);

    return await this.rentalRepository.save(newRental);
  }
}
