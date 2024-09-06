import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>
    ){

    }
    findAll():Promise<Transaction[]>{
        return this.transactionRepository.find();
    }

    findOne(id: number): Promise<Transaction>{
        return this.transactionRepository.findOneBy({id});
    }

    async create(item: Partial<Transaction>):Promise<Transaction>{
        const newItem = this.transactionRepository.create(item);
        return await this.transactionRepository.save(newItem);
    }

}
