import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movies.entity';

@Controller()
export class MoviesController {
  constructor(private readonly appService: MoviesService) {}

  @Get()
  getHello(): Promise<Movie> {
    return this.appService.addMovie();
  }
}
