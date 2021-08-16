import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationPipe } from 'src/common/pipe/index.pipe';
import { AddCarDto, EditCarDto, FilterCarInParkingLotDto, GetAllCarInParkingLotDto, GetCarDto, SortCarInParkingLotDto } from 'src/dto/car/index.dto';
import { PaginationDto } from 'src/dto/request/index.dto';
import { AddDataResultDto, EditDataResultDto, GetAllDataResultDto } from 'src/dto/response/index.dto';
import { CarService } from './car.service';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private _carService: CarService) {}

  @Get('/parking-lot/:parkingLotId')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: GetAllDataResultDto
  })
  @ApiOperation({
    summary: 'Ex 5 Get registration plate number list by car size, Get registration allocated slot number list by car size',
    description: `query string 'search' match with typeName, brandName and plateNumber)`
  })
  async getAllCarInParkingLot(
    @Param('parkingLotId', ParseIntPipe) parkingLotId: number,
    @Query(PaginationPipe) paginationDto: PaginationDto,
    @Query() filterParkingLotDto: FilterCarInParkingLotDto
  ): Promise<GetAllDataResultDto<GetAllCarInParkingLotDto[]>> {
    return await this._carService.getAllCarInParkingLot(parkingLotId, paginationDto, filterParkingLotDto);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: GetCarDto
  })
  async getCarById(@Param('id', ParseIntPipe) id: number): Promise<GetCarDto> {
    return await this._carService.getCarById(id);
  }

  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: AddDataResultDto
  })
  @ApiOperation({
    summary: 'Ex 2 Park the car',
    description: `
    size default value => ['SMALL','MEDIUM','LARGE']
    Example Data
    {
      "parkingLotId": 1,
      "typeName": "รถยนต์",
      "brandName": "BMW",
      "plateNumber": "GEWQ",
      "size": "MEDIUM"
    }
  `
  })
  async registerCarInParkingLot(@Body() addCarDto: AddCarDto): Promise<AddDataResultDto> {
    return await this._carService.registerCarInParkingLot(addCarDto);
  }

  @Patch('/unregister/:id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: EditDataResultDto
  })
  @ApiOperation({ summary: 'Ex 3 Leave the slot', description: '' })
  async unregisterCarInParkingLot(@Param('id', ParseIntPipe) id: number): Promise<EditDataResultDto> {
    return await this._carService.unregisterCarInParkingLot(id);
  }
}
