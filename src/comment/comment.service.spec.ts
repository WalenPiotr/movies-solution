import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { anything, instance, mock, when } from 'ts-mockito';
import { DeepPartial, Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';

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
          movie: { id: 1 },
          title: 'nice title',
          text: 'not very long text but ok',
        },
      ];
      when(repositoryMock.find(anything())).thenCall(arg => expected);
      const value = await service.getComments(input);
      expect(value).toEqual(expected);
    });
  });
});
