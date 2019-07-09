import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { MockType } from '../lib/mocks/MockType';
import { repositoryMockFactory } from '../lib/mocks/repository';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { ValidationError } from 'class-validator';
import { HttpService } from '@nestjs/common';
import { of } from 'rxjs';
import { mock, when, spy, instance, anything } from 'ts-mockito';
import * as queryjoin from 'query-string';
import * as urljoin from 'url-join';
import { OMDB_API_URL } from '../constants';
import { Rating } from '../rating/rating.entity';

describe('MovieController - unit tests', () => {
  let testModule: TestingModule;
  let service: MovieService;
  let movieRepoMock = mock(Repository);
  let ratingRepoMock = mock(Repository);
  let httpService = mock(HttpService);
  let configService = new ConfigService();

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: instance(movieRepoMock),
        },
        {
          provide: getRepositoryToken(Rating),
          useValue: instance(ratingRepoMock),
        },
        {
          provide: ConfigService,
          useValue: new ConfigService(),
        },
        { provide: HttpService, useValue: instance(httpService) },
      ],
    }).compile();
    service = testModule.get<MovieService>(MovieService);
  });

  beforeEach(async () => {});

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
          Ratings: [{ Source: 'source', Value: 'value' }],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      const observable = of(result);
      when(httpService.get(url)).thenReturn(observable);

      when(movieRepoMock.create(anything())).thenCall(arg => arg);
      when(movieRepoMock.save(anything())).thenCall(arg => arg);
      when(ratingRepoMock.create(anything())).thenCall(arg => arg);
      when(ratingRepoMock.save(anything())).thenCall(arg => arg);

      const input: AddMovieDto = { omdbOptions };
      const expected: DeepPartial<Movie> = {
        Title: 'The Avengers',
        imdbID: '123',
        Ratings: [{ Source: 'source', Value: 'value' }],
        Response: true,
      };
      const value = await service.addMovie(input);
      expect(value).toEqual(expected);
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
      const args = {};
      when(movieRepoMock.find(anything())).thenCall(arg => expected);
      const value = await service.getMovies({});
      expect(value).toBe(expected);
    });
  });
});
