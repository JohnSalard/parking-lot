import { ApiResponseProperty } from '@nestjs/swagger';

export class EditDataResultDto {
  @ApiResponseProperty()
  message: string;

  @ApiResponseProperty()
  id: number;
}
