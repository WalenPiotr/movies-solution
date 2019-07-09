import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { MockType } from '../lib/mocks/MockType';
import { repositoryMockFactory } from '../lib/mocks/repository';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { ValidationError } from 'class-validator';
import { HttpService } from '@nestjs/common';
import { of } from 'rxjs';
import { mock, when, spy, instance } from 'ts-mockito';
import * as queryjoin from 'query-string';
import * as urljoin from 'url-join';
import { OMDB_API_URL } from '../constants';

describe('MovieController - unit tests', () => {
  let service: MovieService;
  let repositoryMock: MockType<Repository<Movie>>;
  let testModule: TestingModule;
  let httpService = mock(HttpService);
  let configService: ConfigService;

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
        { provide: HttpService, useValue: instance(httpService) },
      ],
    }).compile();
  });

  beforeEach(async () => {
    service = testModule.get<MovieService>(MovieService);
    repositoryMock = testModule.get(getRepositoryToken(Movie));
    configService = testModule.get<ConfigService>(ConfigService);
  });

  describe('addMovie', () => {
    it('should fetch other movie details and save to application database.', async () => {
      const omdbOptions = {
        i: 'tt0848228',
      };
      const queryString =
        '?' +
        queryjoin.stringify({
          apikey: configService.apiKey,
          ...omdbOptions,
        });
      const url = urljoin(OMDB_API_URL, queryString);
      const result = {
        data: {
          Title: 'The Avengers',
          imdbID: '123',
          Response: 'True',
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      const observable = of(result);
      when(httpService.get(url)).thenReturn(observable);
      const input: AddMovieDto = { omdbOptions };
      const expected: Partial<Movie> = {
        Title: 'The Avengers',
        imdbID: '123',
        Response: true,
      };
      const value = await service.addMovie(input);
      expect(value).toBe(expected);
    });
    it('should throw error if api returns with errors', async () => {
      const input: AddMovieDto = {
        omdbOptions: {
          i: 'tt0848228aa',
        },
      };
      let error: Error;
      try {
        await service.addMovie(input);
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
    });
    it('should fail if no omdb id or title is provided', async () => {
      const input: AddMovieDto = {
        omdbOptions: {},
      };
      let error;
      try {
        await service.addMovie(input);
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
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
