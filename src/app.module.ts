import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 32770,
      username: 'root',
      password: 'root',
      database: 'finance_app',
      entities: [User],
      synchronize: true,
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
