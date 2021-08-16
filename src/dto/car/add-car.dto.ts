import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class AddCarDto {
  @ApiProperty()
  parkingLotId: number;

  @ApiProperty()
  typeName: string;

  @ApiProperty()
  brandName: string;

  @ApiProperty()
  plateNumber: string;

  @ApiProperty()
  size: string;
}
