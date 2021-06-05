import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // will make the .env properties available throughout the application.
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
