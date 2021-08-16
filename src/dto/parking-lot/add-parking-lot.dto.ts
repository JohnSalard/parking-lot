import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class AddParkingLotDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  slot: number;

  @ApiProperty()
  isActive: boolean;
}
