import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { OneRequired } from '../../lib/validators/oneRequired/oneRequired';

export class AddMovieDto {
  @OneRequired(['t'])
  @IsString()
  @MinLength(1)
  i?: string;

  @IsString()
  @MinLength(1)
  t?: string;

  @IsOptional()
  @IsIn(['movie', 'series', 'episode'])
  type?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  y?: number;

  @IsOptional()
  @IsIn(['full', 'short'])
  plot?: string;

  @IsOptional()
  @IsIn(['json', 'xml'])
  r?: string;

  @IsOptional()
  v?: number;
}
