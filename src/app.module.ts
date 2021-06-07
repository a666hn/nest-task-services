import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotnev from 'dotenv';
import { DBConnectionClass } from './globals/configs/database.config';
import { TasksModule } from './tasks/tasks.module';

dotnev.config()

let connection: any;

const { NODE_ENV } = process.env
const configDB = new DBConnectionClass();

if (NODE_ENV !== "") {
  connection = configDB[NODE_ENV]
}
@Module({
  imports: [
    // will make the .env properties available throughout the application.
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(connection),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
