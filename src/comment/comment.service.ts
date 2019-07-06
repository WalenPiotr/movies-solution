import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { AddCommentDto, GetCommentsDto } from './comment.controller';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  private apiKey: string;
  private readonly commentRepository: Repository<Comment>;
  constructor(
    @InjectRepository(Comment)
    commentRepository: Repository<Comment>,
    config: ConfigService,
  ) {
    this.apiKey = config.apiKey;
    this.commentRepository = commentRepository;
  }

  async addComment(addCommentDto: AddCommentDto): Promise<Comment> {
    return this.commentRepository.create({
      ...addCommentDto.comment,
      movie: { id: addCommentDto.movieId },
    });
  }

  async getComments(getMoviesDto: GetCommentsDto): Promise<Comment[]> {
    return this.commentRepository.find({});
  }
}
