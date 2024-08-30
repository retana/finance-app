import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}

    @Get()
    async findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Post()
    async create(@Body() createUserDto: Partial<User>): Promise<User>{
        return this.userService.create(createUserDto);
    }
}
