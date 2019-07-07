import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';

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
    return this.commentRepository.create({
      ...args.comment,
      movie: { id: args.movieId },
    });
  }

  async getComments(args: GetCommentsDto): Promise<Comment[]> {
    return this.commentRepository.find({});
  }
}
