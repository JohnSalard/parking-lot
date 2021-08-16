import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class EditCarDto {
  @ApiProperty()
  parkingLotId: number;

  @ApiProperty()
  isRegister: boolean;
}
