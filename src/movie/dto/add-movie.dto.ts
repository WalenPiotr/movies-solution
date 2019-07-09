import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class OMDBOptions {
  @ApiModelProperty({ example: 'tt0848228' })
  @ValidateIf(o => o.t === undefined)
  @IsString()
  @MinLength(1)
  i?: string;

  @ApiModelPropertyOptional({ example: 'Avengers' })
  @ValidateIf(o => o.i === undefined)
  @IsString()
  @MinLength(1)
  t?: string;

  @ApiModelPropertyOptional({ enum: ['movie', 'series', 'episode'] })
  @IsOptional()
  @IsIn(['movie', 'series', 'episode'])
  type?: string;

  @ApiModelPropertyOptional({ example: 2012 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  y?: number;

  @ApiModelPropertyOptional({ enum: ['full', 'short'] })
  @IsOptional()
  @IsIn(['full', 'short'])
  plot?: string;

  @ApiModelPropertyOptional({ enum: ['json', 'xml'] })
  @IsOptional()
  @IsIn(['json', 'xml'])
  r?: string;

  @ApiModelPropertyOptional({ example: 1 })
  @IsOptional()
  v?: number;
}

export class AddMovieDto {
  @ValidateNested()
  @Type(() => OMDBOptions)
  @ApiModelProperty()
  omdbOptions: OMDBOptions;
}
