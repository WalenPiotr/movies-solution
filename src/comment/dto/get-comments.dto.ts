import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationDto } from '../../lib/pagination/pagination.dto';
import { Type } from 'class-transformer';

export class GetCommentsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto;
}
