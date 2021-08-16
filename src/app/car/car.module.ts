import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepository } from 'src/repository/car.repository';
import { ParkingLotRepository } from 'src/repository/parking-lot.repository';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarRepository, ParkingLotRepository])],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
