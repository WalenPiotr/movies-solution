import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { anything, instance, mock, when, deepEqual } from 'ts-mockito';
import { DeepPartial, Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';
import { ValidationError } from 'class-validator';

describe('CommentController - unit tests', () => {
  let service: CommentService;
  let repositoryMock = mock(Repository);
  let testModule: TestingModule;

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: instance(repositoryMock),
        },
        {
          provide: ConfigService,
          useValue: new ConfigService(),
        },
      ],
    }).compile();
  });

  beforeEach(async () => {
    service = testModule.get<CommentService>(CommentService);
  });

  describe('addComment', () => {
    it('should add comment to existing movie', async () => {
      const input: AddCommentDto = {
        movieId: 'tt1111',
        comment: {
          title: 'nice title',
          text: 'not very long text but ok',
        },
      };
      const expected: DeepPartial<Comment> = {
        movie: { imdbID: 'tt1111' },
        title: 'nice title',
        text: 'not very long text but ok',
      };
      when(repositoryMock.create(anything())).thenCall(arg => arg);
      when(repositoryMock.save(anything())).thenCall(arg => arg);
      const value = await service.addComment(input);
      expect(value).toEqual(expected);
    });
  });

  describe('getComments', () => {
    it('should fetch comments list', async () => {
      const input = {};
      const expected: Array<DeepPartial<Comment>> = [
        {
          movie: { imdbID: 'tt111111' },
          title: 'nice title',
          text: 'not very long text but ok',
        },
      ];
      when(
        repositoryMock.find(
          deepEqual({
            take: 25,
            skip: 0,
            order: {
              id: 'ASC',
            },
          }),
        ),
      ).thenResolve(expected);
      const value = await service.getComments(input);
      expect(value).toEqual(expected);
    });
    it(`should fail if pagination params are out of valid range`, async () => {
      let error: Error;
      try {
        await service.getComments({
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
