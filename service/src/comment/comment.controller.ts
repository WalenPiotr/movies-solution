import { Body, Controller, Post, Get, Query } from '@nestjs/common';

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
  getMovies(
    @Query('take') take: string,
    @Query('skip') skip: string,
  ): Promise<Comment[]> {
    return this.appService.getComments({
      pagination: {
        take: parseInt(take, 10),
        skip: parseInt(skip, 10),
      },
    });
  }
}
