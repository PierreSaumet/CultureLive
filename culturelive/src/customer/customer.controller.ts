import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /*
    Add a customer
  */
  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  /*
    Update a customer by id
  */
  @Put(':id')
  async updateCustomer(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }
}
