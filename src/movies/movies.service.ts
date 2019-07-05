import { Injectable } from '@nestjs/common';
import { Movie } from './movies.entity';
import fetch from 'node-fetch';
import { ConfigService } from '../config/config.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class MoviesService {
  private apiKey: string;
  constructor(config: ConfigService) {
    this.apiKey = config.apiKey;
  }

  async addMovie(): Promise<Movie> {
    const res = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=${this.apiKey}`,
    );
    const data = await res.json();
    const movie = plainToClass(Movie, data);
    const errors = await validate(movie);
    if (errors.length > 0) {
      throw errors;
    }
    return movie;
  }
}
