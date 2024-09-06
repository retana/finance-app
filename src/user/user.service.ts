import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

//ORM - Object Relational Mapping

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){

    }
    findAll():Promise<User[]>{
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User>{
        return this.userRepository.findOneBy({id});
    }

    async create(item: Partial<User>):Promise<User>{
        const newItem = this.userRepository.create(item);
        return await this.userRepository.save(newItem);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({where: {username}});
    }

}
