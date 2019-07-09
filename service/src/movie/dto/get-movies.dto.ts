import { ValidateNested, IsOptional } from 'class-validator';
import { PaginationDto } from '../../lib/pagination/pagination.dto';
import { Type } from 'class-transformer';

export class GetMoviesDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto;
}
