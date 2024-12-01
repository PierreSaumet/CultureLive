import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { RentalService } from 'src/rental/rental.service';

@Injectable()
export class TaskService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,

    private rentalService: RentalService,
  ) {}

  private readonly logger = new Logger(TaskService.name);

  /*
    Return an array with all name job and with timestamp
  */
  getCrons(): any {
    const jobs = this.schedulerRegistry.getCronJobs();

    const cronDetails = Array.from(jobs).map(([name, cronJob]) => {
      let next;
      try {
        next = cronJob.nextDate().toJSDate();
      } catch {
        next = 'error: next date is in the past?';
      }
      return { name, next };
    });

    return cronDetails;
  }

  /*
    Get cron by name
  */
  getCronByName(name: string) {
    try {
      const cronJob = this.schedulerRegistry.getCronJob(name);
      return cronJob;
    } catch {
      this.logger.error(`Cron with ${name} does not exist.`);
      throw new NotFoundException(`Cron with ${name} does not exist.`);
    }
  }

  /*
    Cron job which display a message for every rental at J-5 rental date
  */
  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'EmailJ5',
  })
  async handleEmailReminderJ5() {
    const today = new Date();
    const rentals = await this.rentalService.findAll();

    this.logger.debug(`\n\n***** EmailCron J5 *****`);

    for (const rental of rentals) {
      const targerDate = new Date(rental.return_date);
      targerDate.setDate(targerDate.getDate() - 5);

      if (targerDate.toDateString() == today.toDateString()) {
        console.log(
          `Email J5 for rental id: ${rental.rental_id} and customer id ${rental.customer_id}`,
        );
      }
    }
  }

  /*
    Cron job which display a message for every rental at J-5 rental date
  */
  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'EmailJ3',
  })
  async handleEmailReminderJ3() {
    const today = new Date();
    const rentals = await this.rentalService.findAll();

    this.logger.debug(`\n\n***** EmailCron J3 *****`);

    for (const rental of rentals) {
      const targerDate = new Date(rental.return_date);
      targerDate.setDate(targerDate.getDate() - 3);

      if (targerDate.toDateString() == today.toDateString()) {
        console.log(
          `Email J3 for rental id: ${rental.rental_id} and customer id ${rental.customer_id}`,
        );
      }
    }
  }
}
