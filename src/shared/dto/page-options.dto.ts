import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

import { SortOrder } from '../constants/sort-order.constant';

export class PageOptionsDto {
  @ApiPropertyOptional({
    example: '',
  })
  @IsOptional()
  readonly s?: string;

  @ApiPropertyOptional({
    example: '',
  })
  @IsOptional()
  readonly filter?: string;

  @ApiPropertyOptional({
    example: '',
  })
  @IsOptional()
  readonly sort?: string;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 100,
    default: 10,
    description: 'Number of items to display',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  readonly limit?: number = 10;

  @ApiPropertyOptional({
    minimum: 0,
    default: 0,
    description: 'Position of items to display',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly offset?: number = 0;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
