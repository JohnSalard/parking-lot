import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepository } from 'src/repository/car.repository';
import { ParkingLotRepository } from 'src/repository/parking-lot.repository';
import { ParkingLotController } from './parking-lot.controller';
import { ParkingLotService } from './parking-lot.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarRepository, ParkingLotRepository])],
  providers: [ParkingLotService],
  controllers: [ParkingLotController]
})
export class ParkingLotModule {}
