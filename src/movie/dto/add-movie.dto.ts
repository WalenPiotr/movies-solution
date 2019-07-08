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
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

class OMDBOptions {
  @ApiModelProperty()
  @ValidateIf(o => o.t === undefined)
  @IsString()
  @MinLength(1)
  i?: string;

  @ApiModelPropertyOptional()
  @ValidateIf(o => o.i === undefined)
  @IsString()
  @MinLength(1)
  t?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsIn(['movie', 'series', 'episode'])
  type?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  y?: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsIn(['full', 'short'])
  plot?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsIn(['json', 'xml'])
  r?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  v?: number;
}

export class AddMovieDto {
  @ValidateNested()
  @Type(() => OMDBOptions)
  @ApiModelProperty()
  omdbOptions: OMDBOptions;
}
