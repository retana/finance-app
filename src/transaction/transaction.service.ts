import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transacción con id ${id} no encontrada`);
    }
    return transaction;
  }

  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionRepository.create(transactionData);
    return await this.transactionRepository.save(transaction);
  }

  async update(id: number, updateData: Partial<Transaction>): Promise<Transaction> {
    const transaction = await this.transactionRepository.preload({
      id,
      ...updateData,
    });
    if (!transaction) {
      throw new NotFoundException(`Transacción con id ${id} no encontrada`);
    }
    return await this.transactionRepository.save(transaction);
  }

  async delete(id: number): Promise<void> {
    const result = await this.transactionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Transacción con id ${id} no encontrada`);
    }
  }
}
