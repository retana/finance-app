import { Category } from "src/category/category.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({unique: true})
    amount: number;
    @Column()
    date: Date;
    @Column()
    description: string;
    
    @ManyToOne(()=> User, (user)=> user.transactions ,{ eager: true})
    user: User;

    @ManyToOne(()=>Category, (category)=> category.transactions, {eager: true})
    category: Category;
}
