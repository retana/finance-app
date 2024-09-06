import { Transaction } from "../transaction/transaction.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    description: string;
    @OneToMany(()=> Transaction, (transaction)=> transaction.category)
    transactions: [];
}

