import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotnev from 'dotenv';

dotnev.config();

export class DBConnectionClass {
  development: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRE_HOST,
    port: Number(process.env.POSTGRE_PORT),
    username: process.env.POSTGRE_USER,
    password: process.env.POSTGRE_PASS,
    database: process.env.POSTGRE_DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
    uuidExtension: 'uuid-ossp'
  }
}