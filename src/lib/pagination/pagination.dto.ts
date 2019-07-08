import { Min, Max } from 'class-validator';

export class PaginationDto {
  @Min(0)
  @Max(50)
  take: number = 25;

  @Min(0)
  skip: number = 0;
}
