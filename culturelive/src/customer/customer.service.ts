import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /*
    Return one customer find by id
  */
  async findOneById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({
      customer_id: id,
    });

    // If customer do not exist, throw exception
    if (!customer) {
      throw new NotFoundException(`The customer with ID ${id} not found.`);
    }

    return customer;
  }

  /*
    Create a new customer and save it in the database.
    Return new customer
  */
  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    // init var
    let newTimezone = 0;

    // Get Date
    const { create_date, ...customerData } = createCustomerDto;

    if (create_date) {
      // Get Timezone
      const timezoneString = create_date.slice(23, 26);

      // Convert to int
      const timezoneInt = parseInt(timezoneString, 10);

      // Check valid
      const isValidTimezone = timezoneInt >= -12 && timezoneInt <= 14;

      // Valid Timezone
      if (isValidTimezone) {
        newTimezone = timezoneInt;
      } else {
        newTimezone = 0;
      }
    } else {
      newTimezone = 0;
    }

    // Create user
    const newCustomer = this.customerRepository.create({
      ...customerData,
      create_date: create_date ? create_date : Date(),
      timezone: newTimezone,
    });

    // Return saved user
    return await this.customerRepository.save(newCustomer);
  }

  /*
    Update an existing customer
    Return modified customer
  */
  async updateCustomer(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    // Get customer
    const customer = await this.customerRepository.findOneBy({
      customer_id: id,
    });

    // If customer do not exist, throw exception
    if (!customer) {
      throw new NotFoundException(`The customer with ID ${id} not found.`);
    }

    // Update information
    await this.customerRepository.update(id, updateCustomerDto);

    return this.customerRepository.findOneBy({
      customer_id: id,
    });
  }
}
