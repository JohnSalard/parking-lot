import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
const ENV = process.env.NODE_ENV;
require('dotenv').config({ path: path.resolve(`env/${!ENV ? '.env' : `${ENV}.env`}`) });
// require('dotenv');

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: parseInt(process.env['POSTGRES_PORT']),
  database: process.env['POSTGRES_DB'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  autoLoadEntities: true,
  synchronize: true
};
