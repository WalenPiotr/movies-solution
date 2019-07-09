import { IsInt, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Comment } from '../comment.entity';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

class CommentDto implements Partial<Comment> {
  @ApiModelProperty({ example: 'Comment title' })
  @MinLength(1)
  @MaxLength(25)
  title: string;

  @ApiModelProperty({ example: 'Comment text' })
  @MinLength(1)
  @MaxLength(100)
  text: string;
}

export class AddCommentDto {
  @ApiModelProperty({ example: 1 })
  @IsInt()
  movieId: number;

  @ApiModelProperty()
  @ValidateNested()
  @Type(() => CommentDto)
  comment: CommentDto;
}
