import { Min, Max } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @Min(0)
  @Max(50)
  @ApiModelPropertyOptional({ default: 25 })
  take: number = 25;

  @Min(0)
  @ApiModelPropertyOptional({ default: 0 })
  skip: number = 0;
}
