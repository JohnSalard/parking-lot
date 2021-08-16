import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { SizeCarEnum } from 'src/common/enum/size.enum';

export class FilterCarInParkingLotDto {
  @IsOptional()
  @ApiPropertyOptional()
  search: string;

  @IsOptional()
  @ApiPropertyOptional()
  isRegister: boolean;

  @IsOptional()
  @ApiPropertyOptional({ enum: SizeCarEnum })
  size: SizeCarEnum;
}
