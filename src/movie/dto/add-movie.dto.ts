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

export class AddMovieDto {
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
}
