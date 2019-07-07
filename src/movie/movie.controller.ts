import { Body, Controller, Post, Get } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { GetMoviesDto } from './dto/get-movies.dto';

@Controller('movies')
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
