import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { MockType } from '../lib/mocks/MockType';
import { repositoryMockFactory } from '../lib/mocks/repository';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { AddMovieDto } from './dto/add-movie.dto';

describe('MovieController - unit tests', () => {
  let service: MovieService;
  let repositoryMock: MockType<Repository<Movie>>;
  let testModule: TestingModule;

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useFactory: repositoryMockFactory,
        },
        {
          provide: ConfigService,
          useValue: new ConfigService(),
        },
      ],
    }).compile();
  });

  beforeEach(async () => {
    service = testModule.get<MovieService>(MovieService);
    repositoryMock = testModule.get(getRepositoryToken(Movie));
  });

  describe('addMovie', () => {
    it('should fetch other movie details and save to application database.', async () => {
      const input: AddMovieDto = {
        i: 'tt0848228',
      };
      const expected: Partial<Movie> = {
        Title: 'The Avengers',
      };
      const value = await service.addMovie(input);
      expect(value.Title).toBe(expected.Title);
      expect(value.imbdID).toBe(expected.imbdID);
    });
  });

  describe('getMovies', () => {
    it('should fetch list of all movies already present in application database.', async () => {
      const expected: Partial<Movie>[] = [{ Title: 'asfd' }];
      repositoryMock.find.mockReturnValue(expected);
      const value = await service.getMovies({});
      expect(value).toBe(expected);
    });
  });
});
