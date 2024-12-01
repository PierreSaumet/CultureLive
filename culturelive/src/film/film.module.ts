import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './film.entity';
import { FilmService } from './film.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  providers: [FilmService],
  controllers: [],
  exports: [FilmService], // useelss?
})
export class FilmModule {}
