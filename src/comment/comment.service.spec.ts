import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { MockType } from '../lib/mocks/MockType';
import { repositoryMockFactory } from '../lib/mocks/repository';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';

describe('CommentController - unit tests', () => {
  let service: CommentService;
  let repositoryMock: MockType<Repository<Comment>>;
  let testModule: TestingModule;

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
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
    service = testModule.get<CommentService>(CommentService);
    repositoryMock = testModule.get(getRepositoryToken(Comment));
  });

  describe('addComment', () => {
    it('should add comment to existing movie', async () => {
      const input: AddCommentDto = {
        movieId: 1,
        comment: {
          title: 'nice title',
          text: 'not very long text but ok',
        },
      };
      const expected: DeepPartial<Comment> = {
        movie: { id: 1 },
        title: 'nice title',
        text: 'not very long text but ok',
      };
      repositoryMock.create.mockReturnValue(expected);
      const value = await service.addComment(input);
      expect(value).toBe(expected);
    });
  });

  describe('getComments', () => {
    it('should fetch comments list', async () => {
      const input: AddCommentDto = {
        movieId: 1,
        comment: {
          title: 'nice title',
          text: 'not very long text but ok',
        },
      };
      const expected: DeepPartial<Comment>[] = [
        {
          movie: { id: 1 },
          title: 'nice title',
          text: 'not very long text but ok',
        },
      ];
      repositoryMock.find.mockReturnValue(expected);
      const value = await service.getComments(input);
      expect(value).toBe(expected);
    });
  });
});
