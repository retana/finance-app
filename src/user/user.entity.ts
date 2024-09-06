import { Transaction } from "src/transaction/transaction.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({unique: true})
    username: string;
    @Column()
    password: string;
    @Column()
    active: boolean;

    @OneToMany(()=> Transaction, (transction)=> transction.user)
    transactions: [];
}
