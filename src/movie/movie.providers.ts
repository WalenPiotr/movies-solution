import { Connection, Repository } from 'typeorm';
import { Movie } from './movie.entity';

export const photoProviders = [
  {
    provide: 'MOVIE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Movie),
    inject: ['DATABASE_CONNECTION'],
  },
];
