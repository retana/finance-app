import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    //Init: Swagger configuration
      const config = new DocumentBuilder()
      .setTitle('FinanceApp example')
      .setDescription('Aplicacion para control de gastos')
      .setVersion('1.0')
      .addTag('FinanceApp')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  //End: Swagger configuration
  await app.listen(3000);
}
bootstrap();
