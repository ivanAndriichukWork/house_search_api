import { ApiProperty } from '@nestjs/swagger';

export class ListResponseDto {
  @ApiProperty({ example: 10 })
  totalCount: number;

  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  limit: number;
}
