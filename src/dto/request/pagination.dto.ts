import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional()
  page: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional()
  limit: number;
}
