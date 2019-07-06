import { Body, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  validate,
  ValidateIf,
  IsString,
  MinLength,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import fetch from 'node-fetch';
import * as queryjoin from 'query-string';
import { Repository } from 'typeorm';
import * as urljoin from 'url-join';
import { ConfigService } from '../config/config.service';
import { OMDB_API_URL } from '../constants';
import { Movie } from './movie.entity';
import { OneRequired } from '../lib/validators/oneRequired/oneRequired';
import { AddMovieDto, GetMoviesDto } from './movie.controller';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
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
    const movie = plainToClass(Movie, data);
    const result = await this.movieRepository.save(movie);
    const errors = await validate(movie);
    if (errors.length > 0) {
      throw errors;
    }
    return result;
  }

  async getMovies(getMoviesDto: GetMoviesDto): Promise<Movie[]> {
    return this.movieRepository.find({});
  }
}
