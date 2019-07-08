import { IsInt, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Comment } from '../comment.entity';
import { Type } from 'class-transformer';

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
  @Type(() => CommentDto)
  comment: CommentDto;
}
