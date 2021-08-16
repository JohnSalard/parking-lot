import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

enum FieldCarInParkingLot {
  SIZE = 'size'
}

enum OrderField {
  ASC = 'ASC',
  DESC = 'DESC'
}
export class SortCarInParkingLotDto {
  @IsOptional()
  @ApiPropertyOptional({ enum: FieldCarInParkingLot })
  field: FieldCarInParkingLot;

  @IsOptional()
  @ApiPropertyOptional({ enum: OrderField })
  order: OrderField;
}
