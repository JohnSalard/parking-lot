import { ApiResponseProperty } from '@nestjs/swagger';

export class AddDataResultDto {
  @ApiResponseProperty()
  message: string;

  @ApiResponseProperty()
  id: string | number;
}
