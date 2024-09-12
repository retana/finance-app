import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { EncryptService } from 'src/shared/encrypt.service';

//ORM - Object Relational Mapping

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly encryptService: EncryptService,
    ){

    }
    findAll():Promise<User[]>{
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User>{
        return this.userRepository.findOneBy({id});
    }

    async create(item: Partial<User>):Promise<User>{
        const hashedPassword = await this.encryptService.hashPassword(item.password);
        item.password = hashedPassword;
        const newItem = this.userRepository.create(item);
        return await this.userRepository.save(newItem);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({where: {username}});
    }

}
