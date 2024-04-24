import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Page number',
    default: 1,
    required: false,
    minimum: 1,
  })
  @Transform(({ value }) => +value)
  @Min(1)
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Limit number',
    default: 10,
    required: false,
    minimum: 1,
  })
  @Transform(({ value }) => +value)
  @Min(1)
  limit?: number = 10;
}
