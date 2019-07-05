import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller()
export class MoviesController {
  constructor(private readonly appService: MoviesService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
