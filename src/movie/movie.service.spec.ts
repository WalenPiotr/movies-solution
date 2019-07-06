import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { AddMovieDto, MoviesController } from './movie.controller';
import { Movie } from './movie.entity';
import { MoviesService } from './movie.service';
import { Repository, DeepPartial } from 'typeorm';

export type MockType<T> = { [P in keyof T]: jest.Mock<{}> };

export const repositoryMockFactory = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  find: jest.fn(entity => entity),
}));

describe('MoviesController', () => {
  let service: MoviesService;
  let repositoryMock: MockType<Repository<Movie>>;
  let testModule: TestingModule;

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(Movie),
          useFactory: repositoryMockFactory,
        },
        {
          provide: ConfigService,
          useValue: new ConfigService(`.env`),
        },
      ],
    }).compile();
  });

  beforeEach(async () => {
    service = testModule.get<MoviesService>(MoviesService);
    repositoryMock = testModule.get(getRepositoryToken(Movie));
  });

  describe('addMovie', () => {
    it('other movie details should be fetched and saved to application database.', async () => {
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
