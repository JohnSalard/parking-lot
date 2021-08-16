import { ApiResponseProperty } from '@nestjs/swagger';

export class RemoveDataResultDto {
  @ApiResponseProperty()
  message: string;
}
