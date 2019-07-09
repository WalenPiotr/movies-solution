import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiImplicitQuery } from '@nestjs/swagger';
import { formatError } from '../formatError';
import { AddMovieDto } from './dto/add-movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly appService: MovieService) {}

  @Post()
  addMovie(@Body() addMovieDto: AddMovieDto): Promise<Movie> {
    try {
      return this.appService.addMovie(addMovieDto);
    } catch (e) {
      throw formatError(e);
    }
  }

  @ApiImplicitQuery({
    name: 'skip',
    description: 'min=0, default=0',
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: 'take',
    description: 'min=0, max=50, default=25',
    required: false,
    type: Number,
  })
  @Get()
  async getMovies(
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 25,
  ): Promise<Movie[]> {
    try {
      return await this.appService.getMovies({
        pagination: {
          take,
          skip,
        },
      });
    } catch (e) {
      throw formatError(e);
    }
  }
}
