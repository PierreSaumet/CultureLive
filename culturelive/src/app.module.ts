import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/customer.entity';
import { CustomerModule } from './customer/customer.module';
import { RentalModule } from './rental/rental.module';
import { FilmModule } from './film/film.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'postgres',
      password: 'postgres_pwd',
      database: 'sakila',
      autoLoadEntities: true,
      entities: [Customer],
      synchronize: true,
      retryAttempts: 20,
      retryDelay: 3000,
    }),
    CustomerModule,
    RentalModule,
    FilmModule,
    ScheduleModule.forRoot(),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
