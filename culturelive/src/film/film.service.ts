import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  /*
    Return one film by id
  */
  async findOneById(id: number): Promise<Film> {
    const film = await this.filmRepository.findOneBy({
      film_id: id,
    });

    if (!film) {
      throw new NotFoundException(`The movie with ID ${id} not found.`);
    }

    return film;
  }
}
