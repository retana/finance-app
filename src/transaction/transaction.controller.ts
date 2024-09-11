import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Patch,
  } from '@nestjs/common';
  import { TransactionService } from './transaction.service';
  import { Transaction } from './transaction.entity';
  
  @Controller('transactions')
  export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}
  
    // Obtener todas las transacciones
    @Get()
    async findAll(): Promise<Transaction[]> {
      return this.transactionService.findAll();
    }
  
    // Obtener una transacción por ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Transaction> {
      return this.transactionService.findOne(id);
    }
  
    // Crear una nueva transacción
    @Post()
    async create(@Body() transactionData: Partial<Transaction>): Promise<Transaction> {
      return this.transactionService.create(transactionData);
    }
  
    // Actualizar una transacción completa (PUT)
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateData: Partial<Transaction>): Promise<Transaction> {
      return this.transactionService.update(id, updateData);
    }
  
    // Actualizar parcialmente una transacción (PATCH)
    @Patch(':id')
    async partialUpdate(@Param('id') id: number, @Body() updateData: Partial<Transaction>): Promise<Transaction> {
      return this.transactionService.update(id, updateData);
    }
  
    // Eliminar una transacción
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      return this.transactionService.delete(id);
    }
  }
  