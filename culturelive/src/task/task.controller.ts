import { Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TasController {
  constructor(private readonly taskService: TaskService) {}

  /*
    Return all Tasks
  */
  @Get()
  findAll(): string {
    const crons = this.taskService.getCrons();

    return JSON.stringify(crons);
  }

  /*
    Get a cronjob by his name
      Return name, runnng, next and last execution (timestamp)
  */
  @Get(':name')
  findOne(@Param() params: any): any {
    const cron = this.taskService.getCronByName(params.name);

    return {
      name: params.name,
      running: cron.running,
      nextExecution: cron.nextDate(),
      lastExecution: cron.lastDate(),
    };
  }

  /*
    Start a cronJob,
      params: EmailJ5 or EmailJ3
  */
  @Post(':cronName')
  runTask(@Param('cronName') cronName: string) {
    if (cronName === 'EmailJ5') {
      this.taskService.handleEmailReminderJ5();
      return { message: 'CronJob J5 done!' };
    } else if (cronName === 'EmailJ3') {
      this.taskService.handleEmailReminderJ3();
      return { message: 'CronJob J3 done!' };
    } else {
      return { message: 'Error with the name you gave.' };
    }
  }
}
