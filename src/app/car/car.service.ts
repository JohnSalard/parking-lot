import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCarDto, EditCarDto, FilterCarInParkingLotDto, GetAllCarInParkingLotDto, GetCarDto, SortCarInParkingLotDto } from 'src/dto/car/index.dto';
import { PaginationDto } from 'src/dto/request/index.dto';
import { AddDataResultDto, EditDataResultDto, GetAllDataResultDto } from 'src/dto/response/index.dto';
import { CarEntity } from 'src/model/car.entity';
import { CarRepository } from 'src/repository/car.repository';
import { ParkingLotRepository } from 'src/repository/parking-lot.repository';
import { Connection } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    private connection: Connection,
    @InjectRepository(CarRepository) private _carRepository: CarRepository,
    @InjectRepository(ParkingLotRepository) private _parkingLotRepository: ParkingLotRepository
  ) {}

  async getAllCarInParkingLot(parkingLotId: number, paginationDto: PaginationDto, filterParkingLotDto: FilterCarInParkingLotDto): Promise<GetAllDataResultDto<GetAllCarInParkingLotDto[]>> {
    const { total, page, limit, items } = await this._carRepository.getAllCarInParkingLot(parkingLotId, paginationDto, filterParkingLotDto);
    try {
      const parkingLotData: GetAllCarInParkingLotDto[] = items.map(value => {
        let data: GetAllCarInParkingLotDto = new GetAllCarInParkingLotDto();
        data.id = value['car_id'];
        data.parkingLotDetail = `${value['parkingLot_name']} - ${value['parkingLot_address']}`;
        data.isRegister = value['car_isRegister'];
        data.registeredAt = value['car_registeredAt'];
        data.unregisteredAt = value['car_unregisteredAt'];
        data.typeName = value['car_typeName'];
        data.brandName = value['car_brandName'];
        data.plateNumber = value['car_plateNumber'];
        data.size = value['car_size'];
        return data;
      });
      let result: GetAllDataResultDto<GetAllCarInParkingLotDto[]> = { total, page, limit, items: parkingLotData };
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCarById(id: number): Promise<GetCarDto> {
    const item = await this._carRepository.getCarById(id);
    if (!item) throw new NotFoundException(`Car with id '${id}' not found`);
    try {
      let carData: GetCarDto = new GetCarDto();
      carData.id = item['car_id'];
      carData.parkingLotDetail = `${item['parkingLot_name']}-${item['parkingLot_address']}`;
      carData.isRegister = item['car_isRegister'];
      carData.registeredAt = item['car_registeredAt'];
      carData.unregisteredAt = item['car_unregisteredAt'];
      carData.typeName = item['car_typeName'];
      carData.brandName = item['car_brandName'];
      carData.plateNumber = item['car_plateNumber'];
      carData.size = item['car_size'];
      return carData;
    } catch (error) {
      throw error;
    }
  }

  async registerCarInParkingLot(addCarDto: AddCarDto): Promise<AddDataResultDto> {
    const { parkingLotId, typeName, brandName, plateNumber, size } = addCarDto;

    let parkingLot = await this._parkingLotRepository.findOne(parkingLotId);
    if (!parkingLot) throw new NotFoundException(`Parking Lot with id '${parkingLotId}' not found`);

    if (parkingLot.remain === 0) throw new BadRequestException('Full parking');

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;
    try {
      let car = new CarEntity();
      car.parkingLotId = parkingLotId;
      car.isRegister = true;
      car.registeredAt = new Date();
      car.typeName = typeName;
      car.brandName = brandName;
      car.plateNumber = plateNumber;
      car.size = size;
      const resultAddCar = await this._carRepository.addCar(car, manager);

      console.log(parkingLot.remain);
      parkingLot.remain = --parkingLot.remain;
      await this._parkingLotRepository.registerParkingLotById(parkingLot.id, parkingLot, manager);

      const result: AddDataResultDto = { message: 'Register success', id: resultAddCar.raw[0].id };
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async unregisterCarInParkingLot(id: number): Promise<EditDataResultDto> {
    const car = await this._carRepository.findOne(id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    const parkingLot = await this._parkingLotRepository.findOne(car.parkingLotId);
    if (!parkingLot) throw new NotFoundException(`Parking Lot with id '${parkingLot.id}' not found`);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;
    try {
      car.isRegister = false;
      car.unregisteredAt = new Date();
      const resultEditCar = await this._carRepository.editCarById(id, car, manager);

      parkingLot.remain = ++parkingLot.remain;
      await this._parkingLotRepository.registerParkingLotById(parkingLot.id, parkingLot, manager);

      await queryRunner.commitTransaction();
      const result: EditDataResultDto = { message: 'Unregister success', id: resultEditCar.raw[0].id };
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
