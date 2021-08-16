import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllParkingLotDto, GetParkingLotDto, AddParkingLotDto, EditParkingLotDto, FilterParkingLotDto } from 'src/dto/parking-lot/index.dto';
import { PaginationDto } from 'src/dto/request/index.dto';
import { AddDataResultDto, EditDataResultDto, RemoveDataResultDto, GetAllDataResultDto } from 'src/dto/response/index.dto';
import { ParkingLotEntity } from 'src/model/parking-lot.entity';
import { CarRepository } from 'src/repository/car.repository';
import { ParkingLotRepository } from 'src/repository/parking-lot.repository';
import { Connection } from 'typeorm';

@Injectable()
export class ParkingLotService {
  constructor(
    private connection: Connection,
    @InjectRepository(CarRepository) private _carRepository: CarRepository,
    @InjectRepository(ParkingLotRepository) private _parkingLotRepository: ParkingLotRepository
  ) {}

  async getAllParkingLot(paginationDto: PaginationDto, filterParkingLotDto: FilterParkingLotDto): Promise<GetAllDataResultDto<GetAllParkingLotDto[]>> {
    const { total, page, limit, items } = await this._parkingLotRepository.getAllParkingLot(paginationDto, filterParkingLotDto);
    try {
      const parkingLotData: GetAllParkingLotDto[] = items.map(value => {
        let data: GetAllParkingLotDto = new GetAllParkingLotDto();
        data.id = value.id;
        data.name = value.name;
        data.address = value.address;
        data.slot = value.slot;
        data.remain = value.remain;
        data.isActive = value.isActive;
        return data;
      });
      let result: GetAllDataResultDto<GetAllParkingLotDto[]> = { total, page, limit, items: parkingLotData };
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getParkingLotById(id: number): Promise<GetParkingLotDto> {
    const item = await this._parkingLotRepository.getParkingLotById(id);
    if (!item) throw new NotFoundException(`Parking Lot with id '${id}' not found`);
    try {
      let parkingLotData: GetParkingLotDto = new GetParkingLotDto();
      parkingLotData.id = item['parkingLot_id'];
      parkingLotData.name = item['parkingLot_name'];
      parkingLotData.address = item['parkingLot_address'];
      parkingLotData.slot = item['parkingLot_slot'];
      parkingLotData.remain = item['parkingLot_remain'];
      parkingLotData.isActive = item['parkingLot_isActive'];
      return parkingLotData;
    } catch (error) {
      throw error;
    }
  }

  async addParkingLot(addParkingLotDto: AddParkingLotDto): Promise<AddDataResultDto> {
    const { name, address, slot, isActive } = addParkingLotDto;
    try {
      let parkingLot = new ParkingLotEntity();
      parkingLot.name = name;
      parkingLot.address = address;
      parkingLot.slot = slot;
      parkingLot.remain = slot;
      parkingLot.isActive = isActive;
      parkingLot.createdAt = new Date();
      const resultAddParkingLot = await this._parkingLotRepository.addParkingLot(parkingLot);
      const result: AddDataResultDto = { message: 'Add success', id: resultAddParkingLot.raw[0].id };
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async editParkingLotById(id: number, editParkingLotDto: EditParkingLotDto): Promise<EditDataResultDto> {
    let { name, address, isActive } = editParkingLotDto;
    const parkingLot = await this._parkingLotRepository.findOne(id);
    if (!parkingLot) throw new NotFoundException(`Parking Lot with id '${id}' not found`);
    try {
      parkingLot.name = name;
      parkingLot.address = address;
      parkingLot.isActive = isActive;
      const resultEditParkingLot = await this._parkingLotRepository.editParkingLotById(id, parkingLot);
      const result: EditDataResultDto = { message: 'Edit success', id: resultEditParkingLot.raw[0].id };
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async removeParkingLotById(id: number): Promise<RemoveDataResultDto> {
    const parkingLot = await this._parkingLotRepository.findOne(id);

    if (!parkingLot) throw new NotFoundException(`Parking Lot with id '${id}' not found`);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;

    try {
      await this._carRepository.removeCarByParkingLotId(parkingLot.id, manager);
      await this._parkingLotRepository.removeParkingLotById(id, manager);
      const result: RemoveDataResultDto = { message: 'Remove success' };
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
