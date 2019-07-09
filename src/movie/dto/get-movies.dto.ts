import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationDto } from '../../lib/pagination/pagination.dto';

export class GetMoviesDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto;
}
