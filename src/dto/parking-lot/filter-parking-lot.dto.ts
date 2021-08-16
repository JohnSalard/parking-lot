import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FilterParkingLotDto {
  @IsOptional()
  @ApiPropertyOptional()
  isActive: boolean;
}
