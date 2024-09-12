import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { EncryptService } from 'src/shared/encrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],  
  providers: [UserService,EncryptService],
  controllers: [UserController],
  exports: [UserService,EncryptService],

})
export class UserModule {}
