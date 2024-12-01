import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { CustomerModule } from 'src/customer/customer.module';
import { FilmModule } from 'src/film/film.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rental]), CustomerModule, FilmModule],
  providers: [RentalService],
  controllers: [RentalController],
  exports: [RentalService],
})
export class RentalModule {}
