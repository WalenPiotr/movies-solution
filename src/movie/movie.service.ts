import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validate, Validate, ValidateIf } from 'class-validator';
import fetch from 'node-fetch';
import * as queryjoin from 'query-string';
import { Repository } from 'typeorm';
import * as urljoin from 'url-join';
import { ConfigService } from '../config/config.service';
import { OMDB_API_URL } from '../constants';
import { Movie, OMDBMovie, OMDBPayload, OMDBError } from './movie.entity';
import { AddMovieDto } from './dto/add-movie.dto';
import { GetMoviesDto } from './dto/get-movies.dto';
import { PaginationDto } from '../lib/pagination/pagination.dto';
import { Rating } from '../rating/rating.entity';
import { APIError } from '../errors/APIError';

@Injectable()
export class MovieService {
  private readonly apiKey: string;
  private readonly movieRepository: Repository<Movie>;
  private readonly ratingRepository: Repository<Rating>;
  private readonly httpService: HttpService;

  constructor(
    @InjectRepository(Movie)
    movieRepository: Repository<Movie>,
    @InjectRepository(Rating)
    ratingRepository: Repository<Rating>,
    config: ConfigService,
    httpService: HttpService,
  ) {
    this.apiKey = config.apiKey;
    this.ratingRepository = ratingRepository;
    this.movieRepository = movieRepository;
    this.httpService = httpService;
  }

  async addMovie(args: AddMovieDto): Promise<Movie> {
    const argsErrors = await validate(plainToClass(AddMovieDto, args));
    if (argsErrors.length > 0) {
      throw argsErrors;
    }
    const queryString =
      '?' +
      queryjoin.stringify({
        apikey: this.apiKey,
        ...args.omdbOptions,
      });
    const url = urljoin(OMDB_API_URL, queryString);
    const response = await this.httpService.get<OMDBPayload>(url).toPromise();
    const { data } = response;
    if (data.Response && !data.Error) {
      const omdbMovie = plainToClass(OMDBMovie, data as OMDBMovie);
      const omdbErrors = await validate(omdbMovie);
      if (omdbErrors.length > 0) {
        throw omdbErrors;
      }
      const newRatings = this.ratingRepository.create(omdbMovie.Ratings);
      const ratings = await this.ratingRepository.save(newRatings);
      const newMovie = this.movieRepository.create(omdbMovie);
      newMovie.Ratings = ratings;
      return await this.movieRepository.save(newMovie);
    } else {
      if (data.Error) {
        throw new APIError(data as OMDBError);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  async getMovies(args: GetMoviesDto): Promise<Movie[]> {
    const argsErrors = await validate(plainToClass(GetMoviesDto, args));
    if (argsErrors.length > 0) {
      throw argsErrors;
    }
    const pagination = args.pagination ? args.pagination : new PaginationDto();
    const result = await this.movieRepository.find({
      take: pagination.take,
      skip: pagination.skip,
      order: { id: 'ASC' },
    });
    return result;
  }
}
