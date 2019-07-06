import { Body, Controller, Post, Get } from '@nestjs/common';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { OneRequired } from '../lib/validators/oneRequired/oneRequired';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

export class AddMovieDto {
  @OneRequired(['t'])
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

export class GetMoviesDto {}

@Controller()
export class MovieController {
  constructor(private readonly appService: MovieService) {}

  @Post()
  addMovie(@Body() addMovieDto: AddMovieDto): Promise<Movie> {
    return this.appService.addMovie(addMovieDto);
  }

  @Get()
  getMovies(@Body() getMoviesDto: GetMoviesDto): Promise<Movie[]> {
    return this.appService.getMovies(getMoviesDto);
  }
}
