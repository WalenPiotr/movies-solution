import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import fetch from 'node-fetch';
import * as queryjoin from 'query-string';
import { Repository } from 'typeorm';
import * as urljoin from 'url-join';
import { ConfigService } from '../config/config.service';
import { OMDB_API_URL } from '../constants';
import { AddMovieDto, GetMoviesDto } from './movie.controller';
import { Movie, OMDBMovie } from './movie.entity';

@Injectable()
export class MovieService {
  private apiKey: string;
  private readonly movieRepository: Repository<Movie>;
  constructor(
    @InjectRepository(Movie)
    movieRepository: Repository<Movie>,
    config: ConfigService,
  ) {
    this.apiKey = config.apiKey;
    this.movieRepository = movieRepository;
  }

  async addMovie(addMovieDto: AddMovieDto): Promise<Movie> {
    const queryString =
      '?' +
      queryjoin.stringify({
        apikey: this.apiKey,
        ...addMovieDto,
      });
    const res = await fetch(urljoin(OMDB_API_URL, queryString));
    const data = await res.json();
    const omdbMovie = plainToClass(OMDBMovie, data);
    const result = await this.movieRepository.save(omdbMovie);
    const errors = await validate(omdbMovie);
    if (errors.length > 0) {
      throw errors;
    }
    return result;
  }

  async getMovies(getMoviesDto: GetMoviesDto): Promise<Movie[]> {
    return this.movieRepository.find({});
  }
}
