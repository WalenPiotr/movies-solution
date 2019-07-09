import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiImplicitQuery } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { PaginationDto } from '../lib/pagination/pagination.dto';
import { formatError } from '../formatError';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly appService: CommentService) {}

  @Post()
  addMovie(@Body() addCommentDto: AddCommentDto): Promise<Comment> {
    try {
      return this.appService.addComment(addCommentDto);
    } catch (e) {
      throw formatError(e);
    }
  }

  @ApiImplicitQuery({
    name: 'skip',
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: 'take',
    required: false,
    type: Number,
  })
  @Get()
  getMovies(
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 25,
  ): Promise<Comment[]> {
    try {
      const pagination = plainToClass(PaginationDto, { take, skip });
      return this.appService.getComments({
        pagination,
      });
    } catch (e) {
      throw formatError(e);
    }
  }
}
