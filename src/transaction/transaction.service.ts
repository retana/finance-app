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

  // Obtener todas las transacciones
  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  // Obtener transacciones filtradas por id de usuario
  async findByUserId(userId: number): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.find({ where: { user: { id: userId } } });
    if (!transactions || transactions.length === 0) {
      throw new NotFoundException(`No se encontraron transacciones para el usuario con id ${userId}`);
    }
    return transactions;
  }

  // Obtener una transacción por ID
  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transacción con id ${id} no encontrada`);
    }
    return transaction;
  }

  // Crear una nueva transacción
  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionRepository.create(transactionData);
    return await this.transactionRepository.save(transaction);
  }

  // Actualizar una transacción
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

  // Eliminar una transacción
  async delete(id: number): Promise<void> {
    const result = await this.transactionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Transacción con id ${id} no encontrada`);
    }
  }

    // Método que calcula las estadísticas por categoría
  async getCategoryStats(): Promise<any[]> {
    const stats = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('transaction.category.id', 'categoryId')
      .addSelect('transaction.category.description', 'categoryDescription')
      .addSelect('SUM(transaction.amount)', 'totalAmount')
      .leftJoin('transaction.category', 'category')
      .groupBy('transaction.category.id')
      .getRawMany();

    // Mapea los resultados a un formato adecuado
    return stats.map((stat) => ({
      categoryId: stat.categoryId,
      categoryDescription: stat.categoryDescription,
      totalAmount: parseFloat(stat.totalAmount), // Asegúrate de que es un número
    }));
  }
}
