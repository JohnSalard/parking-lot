import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class EditParkingLotDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  isActive: boolean;
}
