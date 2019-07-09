import { Min, Max, IsNumberString } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @Min(0)
  @Max(50)
  @Transform(value => parseInt(value, 10), { toClassOnly: true })
  take: number = 25;

  @Min(0)
  @Transform(value => parseInt(value, 10), { toClassOnly: true })
  skip: number = 0;
}
