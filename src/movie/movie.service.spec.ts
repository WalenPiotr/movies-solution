import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as queryjoin from 'query-string';
import { of } from 'rxjs';
import { anything, instance, mock, when, deepEqual } from 'ts-mockito';
import { DeepPartial, Repository } from 'typeorm';
import * as urljoin from 'url-join';
import { ConfigService } from '../config/config.service';
import { OMDB_API_URL } from '../constants';
import { Rating } from '../rating/rating.entity';
import { AddMovieDto } from './dto/add-movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { ValidationError } from 'class-validator';

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
          plot: 'full',
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
      const input: AddMovieDto = { ...omdbOptions };
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
        i: 'tt0848228aa',
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
      const input: AddMovieDto = {};
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
    it(`should fetch list of movies already present in application
        database.`, async () => {
      const expected: Array<Partial<Movie>> = [{ Title: 'asfd' }];
      when(
        movieRepoMock.find(
          deepEqual({ take: 25, skip: 0, order: { imdbID: 'ASC' } }),
        ),
      ).thenResolve(expected);
      const value = await service.getMovies({});
      expect(value).toEqual(expected);
    });
    it(`should fetch list of movies already present in application database.
        (with custom pagination)`, async () => {
      const expected: Array<Partial<Movie>> = [{ Title: 'asfd' }];
      when(
        movieRepoMock.find(
          deepEqual({ take: 40, skip: 0, order: { imdbID: 'ASC' } }),
        ),
      ).thenResolve(expected);
      const value = await service.getMovies({
        pagination: { take: 40, skip: 0 },
      });
      expect(value).toEqual(expected);
    });
    it(`should fail if pagination params are out of valid range`, async () => {
      let error: Error;
      try {
        await service.getMovies({
          pagination: { take: 80, skip: 0 },
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Array);
      expect(error[0]).toBeInstanceOf(ValidationError);
    });
  });
});
