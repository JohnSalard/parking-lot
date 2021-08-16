import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class GetAllParkingLotDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slot: number;

  @ApiProperty()
  remain: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  isActive: boolean;
}

export class GetParkingLotDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slot: number;

  @ApiProperty()
  remain: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  isActive: boolean;
}
