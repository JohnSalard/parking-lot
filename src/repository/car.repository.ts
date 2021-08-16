import { Repository, EntityRepository, InsertResult, UpdateResult, DeleteResult, EntityManager } from 'typeorm';
import { PaginationDto } from 'src/dto/request/index.dto';
import { GetAllDataResultDto } from 'src/dto/response/index.dto';
import { CarEntity } from 'src/model/car.entity';
import { FilterCarInParkingLotDto, SortCarInParkingLotDto } from 'src/dto/car/index.dto';
import { ParkingLotEntity } from 'src/model/parking-lot.entity';

@EntityRepository(CarEntity)
export class CarRepository extends Repository<CarEntity> {
  async getAllCarInParkingLot(parkingLotId: number, paginationDto: PaginationDto, filterCarInParkingLotDto: FilterCarInParkingLotDto): Promise<GetAllDataResultDto<any>> {
    const { page, limit } = paginationDto;
    const { search, isRegister, size } = filterCarInParkingLotDto;
    const query = this.createQueryBuilder('car')
      .innerJoinAndSelect(ParkingLotEntity, 'parkingLot', 'parkingLot.id = car.parkingLotId')
      .where('car.parkingLotId = :parkingLotId', { parkingLotId });
    if (isRegister) query.andWhere('car.isRegister = :isRegister', { isRegister });
    if (size) query.andWhere('car.size = :size', { size });
    if (search) {
      query
        .andWhere('car.plateNumber like :search', { search: `%${search}%` })
        .orWhere('car.typeName like :search', { search: `%${search}%` })
        .orWhere('car.brandName like :search', { search: `%${search}%` });
    }
    const total = await query.getCount();
    query.orderBy('car.registeredAt', 'DESC', 'NULLS LAST').addOrderBy('car.unregisteredAt', 'DESC', 'NULLS LAST');
    if (page && limit) query.offset((page - 1) * limit).limit(limit);
    const items = await query.getRawMany();
    const result: GetAllDataResultDto<any[]> = { total, page, limit, items };
    return result;
  }

  async getCarById(id: number): Promise<any> {
    return await this.createQueryBuilder('car')
      .innerJoinAndSelect(ParkingLotEntity, 'parkingLot', 'parkingLot.id = car.parkingLotId')
      .where('car.id = :id', { id })
      .getRawOne();
  }

  async addCar(data: CarEntity, entityManager: EntityManager): Promise<InsertResult> {
    return await entityManager
      .createQueryBuilder()
      .insert()
      .into(CarEntity)
      .values(data)
      .returning(['id'])
      .execute();
  }

  async editCarById(id: number, data: CarEntity, entityManager: EntityManager): Promise<UpdateResult> {
    return await entityManager
      .createQueryBuilder()
      .update(CarEntity)
      .set(data)
      .where('id = :id', { id })
      .returning(['id'])
      .execute();
  }

  async removeCarByParkingLotId(parkingLotId: number, entityManager: EntityManager): Promise<DeleteResult> {
    return await entityManager
      .createQueryBuilder()
      .delete()
      .from(CarEntity)
      .where('parkingLotId = :parkingLotId', { parkingLotId })
      .execute();
  }
}
