import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movie.service';
import { Movie } from './movie.entity';

@Controller()
export class MoviesController {
  constructor(private readonly appService: MoviesService) {}

  @Get()
  getHello(): Promise<Movie> {
    return this.appService.addMovie();
  }
}
