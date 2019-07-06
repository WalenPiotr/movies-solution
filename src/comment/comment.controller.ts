import { Body, Controller, Post, Get } from '@nestjs/common';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { OneRequired } from '../lib/validators/oneRequired/oneRequired';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

class CommentDto implements Partial<Comment> {
  @MinLength(5)
  @MaxLength(25)
  title: string;

  @MinLength(1)
  @MaxLength(100)
  text: string;
}

export class AddCommentDto {
  @IsInt()
  movieId: number;

  @ValidateNested()
  comment: CommentDto;
}

export class GetCommentsDto {}

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
