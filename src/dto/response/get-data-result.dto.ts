import { ApiResponseProperty } from '@nestjs/swagger';

export class GetAllDataResultDto<TypeData> {
  @ApiResponseProperty()
  total: number;

  @ApiResponseProperty()
  page: number;

  @ApiResponseProperty()
  limit: number;

  @ApiResponseProperty()
  items: TypeData;
}

export class GetDataResultDto<TypeData> {
  @ApiResponseProperty()
  message: string;

  @ApiResponseProperty()
  item: TypeData;
}
