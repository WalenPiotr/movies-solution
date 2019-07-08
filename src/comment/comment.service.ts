import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { PaginationDto } from '../lib/pagination/pagination.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CommentService {
  private readonly commentRepository: Repository<Comment>;
  constructor(
    @InjectRepository(Comment)
    commentRepository: Repository<Comment>,
  ) {
    this.commentRepository = commentRepository;
  }

  async addComment(args: AddCommentDto): Promise<Comment> {
    const argsErrors = await validate(plainToClass(AddCommentDto, args));
    if (argsErrors.length > 0) {
      throw argsErrors;
    }
    return this.commentRepository.create({
      ...args.comment,
      movie: { id: args.movieId },
    });
  }

  async getComments(args: GetCommentsDto): Promise<Comment[]> {
    const argsErrors = await validate(plainToClass(GetCommentsDto, args));
    if (argsErrors.length > 0) {
      throw argsErrors;
    }
    const pagination = args.pagination ? args.pagination : new PaginationDto();
    return this.commentRepository.find({
      take: pagination.take,
      skip: pagination.skip,
      order: { id: 'ASC' },
    });
  }
}
