import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationPipe } from 'src/common/pipe/index.pipe';
import { GetAllParkingLotDto, GetParkingLotDto, AddParkingLotDto, EditParkingLotDto, FilterParkingLotDto } from 'src/dto/parking-lot/index.dto';
import { PaginationDto } from 'src/dto/request/index.dto';
import { AddDataResultDto, EditDataResultDto, RemoveDataResultDto, GetAllDataResultDto } from 'src/dto/response/index.dto';
import { ParkingLotService } from './parking-lot.service';

@ApiTags('Parking Lot')
@Controller('parking-lot')
export class ParkingLotController {
  constructor(private _parkingLotService: ParkingLotService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: GetAllDataResultDto
  })
  @ApiOperation({ summary: 'Ex 4 Get status of parking lot' })
  async getAllParkingLot(@Query(PaginationPipe) paginationDto: PaginationDto, @Query() filterParkingLotDto: FilterParkingLotDto): Promise<GetAllDataResultDto<GetAllParkingLotDto[]>> {
    return await this._parkingLotService.getAllParkingLot(paginationDto, filterParkingLotDto);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: GetParkingLotDto
  })
  @ApiOperation({ summary: 'Ex 4 Get status of parking lot' })
  async getParkingLotById(@Param('id', ParseIntPipe) id: number): Promise<GetParkingLotDto> {
    return await this._parkingLotService.getParkingLotById(id);
  }

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: AddDataResultDto
  })
  @ApiOperation({
    summary: 'Ex 1 Create parking lot',
    description: `
    Example Data 1
    {
      "name": "อาคารจอดแล้วจร",
      "address": "สถานีคลองบางไผ่",
      "slot": 1986,
      "isActive": true
    }
    Example Data 2
    {
      "name": "อาคารจอดแล้วจร",
      "address": "สถานีบางรักน้อยท่าอิฐ",
      "slot": 1076,
      "isActive": true
    }
    `
  })
  async addParkingLot(@Body() addParkingLotDto: AddParkingLotDto): Promise<AddDataResultDto> {
    return await this._parkingLotService.addParkingLot(addParkingLotDto);
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: EditDataResultDto
  })
  async editParkingLotById(@Param('id', ParseIntPipe) id: number, @Body() editParkingLotDto: EditParkingLotDto): Promise<EditDataResultDto> {
    return await this._parkingLotService.editParkingLotById(id, editParkingLotDto);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: RemoveDataResultDto
  })
  async removeParkingLotById(@Param('id', ParseIntPipe) id: number): Promise<RemoveDataResultDto> {
    return await this._parkingLotService.removeParkingLotById(id);
  }
}
