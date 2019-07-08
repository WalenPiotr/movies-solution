import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { OneRequired } from '../../lib/validators/oneRequired/oneRequired';
import { Type } from 'class-transformer';

class OMDBOptions {
  @ValidateIf(o => o.t === undefined)
  @IsString()
  @MinLength(1)
  i?: string;

  @ValidateIf(o => o.i === undefined)
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

export class AddMovieDto {
  @ValidateNested()
  @Type(() => OMDBOptions)
  omdbOptions: OMDBOptions;
}
