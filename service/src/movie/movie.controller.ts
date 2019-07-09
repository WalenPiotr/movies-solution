import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { GetMoviesDto } from './dto/get-movies.dto';
import { ApiImplicitParam } from '@nestjs/swagger';

@Controller('movies')
export class MovieController {
  constructor(private readonly appService: MovieService) {}

  @Post()
  addMovie(@Body() addMovieDto: AddMovieDto): Promise<Movie> {
    return this.appService.addMovie(addMovieDto);
  }

  @Get()
  getMovies(
    @Query('take') take: string,
    @Query('skip') skip: string,
  ): Promise<Movie[]> {
    return this.appService.getMovies({
      pagination: { take: parseInt(take, 10), skip: parseInt(skip, 10) },
    });
  }
}
