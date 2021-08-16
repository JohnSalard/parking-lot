import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class GetAllCarInParkingLotDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  parkingLotDetail: string;

  @ApiProperty()
  isRegister: boolean;

  @ApiProperty()
  registeredAt: Date;

  @ApiProperty()
  unregisteredAt: Date;

  @ApiProperty()
  typeName: string;

  @ApiProperty()
  brandName: string;

  @ApiProperty()
  plateNumber: string;

  @ApiProperty()
  size: string;
}

export class GetCarDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  parkingLotDetail: string;

  @ApiProperty()
  isRegister: boolean;

  @ApiProperty()
  registeredAt: Date;

  @ApiProperty()
  unregisteredAt: Date;

  @ApiProperty()
  typeName: string;

  @ApiProperty()
  brandName: string;

  @ApiProperty()
  plateNumber: string;

  @ApiProperty()
  size: string;
}
