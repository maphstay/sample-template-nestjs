import { ApiProperty } from '@nestjs/swagger';
import { IPaginationMetaData } from '@interfaces/index';

export class PaginatedResponseDto implements IPaginationMetaData {
  @ApiProperty({
    description: 'Page number',
    default: 1,
    minimum: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Limit number',
    default: 10,
    minimum: 1,
  })
  limit: number;

  @ApiProperty({
    description: 'How many itens exists',
    example: 100,
  })
  totalItens: number;

  @ApiProperty({
    description: 'How many pages exists',
    example: 10,
  })
  totalPages: number;
}
