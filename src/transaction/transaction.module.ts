import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction])
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TypeOrmModule], // Asegúrate de exportar TypeOrmModule
})
export class TransactionModule {}
