import { IsInt, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Comment } from '../comment.entity';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

class CommentDto implements Partial<Comment> {
  @ApiModelProperty()
  @MinLength(5)
  @MaxLength(25)
  title: string;

  @ApiModelProperty()
  @MinLength(1)
  @MaxLength(100)
  text: string;
}

export class AddCommentDto {
  @ApiModelProperty()
  @IsInt()
  movieId: number;

  @ApiModelProperty()
  @ValidateNested()
  @Type(() => CommentDto)
  comment: CommentDto;
}
