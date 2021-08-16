import { ParkingLotEntity } from '../model/parking-lot.entity';
import { Repository, EntityRepository, InsertResult, UpdateResult, DeleteResult, EntityManager } from 'typeorm';
import { PaginationDto } from 'src/dto/request/index.dto';
import { GetAllDataResultDto } from 'src/dto/response/index.dto';
import { FilterParkingLotDto } from 'src/dto/parking-lot/index.dto';

@EntityRepository(ParkingLotEntity)
export class ParkingLotRepository extends Repository<ParkingLotEntity> {
  async getAllParkingLot(paginationDto: PaginationDto, filterParkingLotDto: FilterParkingLotDto): Promise<GetAllDataResultDto<ParkingLotEntity[]>> {
    const { page, limit } = paginationDto;
    const { isActive } = filterParkingLotDto;
    const query = this.createQueryBuilder('parkingLot');
    if (isActive) query.andWhere('parkingLot.isActive = :isActive', { isActive });
    const total = await query.getCount();
    query.orderBy('parkingLot.id');
    if (page && limit) query.offset((page - 1) * limit).limit(limit);
    const items = await query.getMany();
    const result: GetAllDataResultDto<ParkingLotEntity[]> = { total, page, limit, items };
    return result;
  }

  async getParkingLotById(id: number): Promise<any> {
    return await this.createQueryBuilder('parkingLot')
      .where('parkingLot.id = :id', { id })
      .getRawOne();
  }

  async addParkingLot(data: ParkingLotEntity): Promise<InsertResult> {
    return await this.createQueryBuilder()
      .insert()
      .into(ParkingLotEntity)
      .values(data)
      .returning(['id'])
      .execute();
  }

  async editParkingLotById(id: number, data: ParkingLotEntity): Promise<UpdateResult> {
    return await this.createQueryBuilder()
      .update(ParkingLotEntity)
      .set(data)
      .where('id = :id', { id })
      .returning(['id'])
      .execute();
  }

  async registerParkingLotById(id: number, data: ParkingLotEntity, entityManager: EntityManager): Promise<UpdateResult> {
    return await entityManager
      .createQueryBuilder()
      .update(ParkingLotEntity)
      .set(data)
      .where('id = :id', { id })
      .returning(['id'])
      .execute();
  }

  async removeParkingLotById(id: number, entityManager: EntityManager): Promise<DeleteResult> {
    return await entityManager
      .createQueryBuilder()
      .delete()
      .from(ParkingLotEntity)
      .where('id = :id', { id })
      .execute();
  }
}
