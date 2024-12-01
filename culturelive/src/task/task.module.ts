import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TasController } from './task.controller';
import { RentalModule } from 'src/rental/rental.module';

@Module({
  imports: [RentalModule],
  providers: [TaskService],
  controllers: [TasController],
})
export class TaskModule {}
