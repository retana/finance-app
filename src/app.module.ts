import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/transaction.entity';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 32768,
      username: 'root',
      password: 'root',
      database: 'finance_app',
      entities: [
        User,
      Transaction,
    Category],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TransactionModule,
    CategoryModule],
  controllers: [AppController],
  providers: [AppService, CategoryService],
})
export class AppModule {}
