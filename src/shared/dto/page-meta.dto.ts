import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty()
  readonly data: any;

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly pageCount: number;

  constructor(page: number, limit: number, total: number, data: any) {
    this.data = data;
    this.page = page;
    this.count = limit;
    this.pageCount = Math.ceil(total / limit);
    this.total = total;
  }
}
