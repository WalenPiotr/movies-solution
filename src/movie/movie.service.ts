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

export function OneRequired(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            (value === undefined && relatedValue !== undefined) ||
            (value !== undefined && relatedValue === undefined)
          );
        },
      },
    });
  };
}

class AddMovieDto {
  @OneRequired('t')
  @IsString()
  @MinLength(1)
  i?: string;

  @IsString()
  @MinLength(1)
  t?: string;

  @IsOptional()
  @IsIn(['movie', 'series', 'episode'])
  type?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  y?: number;

  @IsOptional()
  @IsIn(['full', 'short'])
  plot?: string;

  @IsOptional()
  @IsIn(['json', 'xml'])
  r?: string;

  @IsOptional()
  v?: number;
}

@Injectable()
export class MoviesService {
  private apiKey: string;
  private readonly movieRepository: Repository<Movie>;
  constructor(
    @Inject('MOVIE_REPOSITORY')
    movieRepository: Repository<Movie>,
    config: ConfigService,
  ) {
    this.apiKey = config.apiKey;
    this.movieRepository = movieRepository;
  }
  async addMovie(@Body() addMovieDto: AddMovieDto): Promise<Movie> {
    const queryString = queryjoin.stringify({
      apikey: this.apiKey,
      i: 'tt3896198',
    });
    const res = await fetch(urljoin(OMDB_API_URL, queryString));
    const data = await res.json();
    const movie = plainToClass(Movie, data);
    const errors = await validate(movie);
    if (errors.length > 0) {
      throw errors;
    }
    return movie;
  }
}
