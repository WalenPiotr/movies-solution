import { Body, Controller, Post, Get } from '@nestjs/common';

import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';


@Controller('comment')
export class CommentController {
  constructor(private readonly appService: CommentService) {}

  @Post()
  addMovie(@Body() addCommentDto: AddCommentDto): Promise<Comment> {
    return this.appService.addComment(addCommentDto);
  }

  @Get()
  getMovies(@Body() getCommentsDto: GetCommentsDto): Promise<Comment[]> {
    return this.appService.getComments(getCommentsDto);
  }
}
