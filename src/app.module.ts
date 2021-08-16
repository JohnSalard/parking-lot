import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotModule } from './app/parking-lot/parking-lot.module';
import { databaseConfig } from './config/index';
import { CarModule } from './app/car/car.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(databaseConfig), ParkingLotModule, CarModule]
})
export class AppModule {}
