import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
      // Habilitar CORS
      app.enableCors({
        origin: '*',  // Cambia '*' por 'http://localhost:8100' o la URL correcta de tu frontend
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept, Authorization',  // Agrega 'Authorization' aquí
        credentials: true,  // Permitir enviar cookies o cabeceras de autenticación
      });
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

  // Configura el guard globalmente
   // Obtén el AuthGuard del módulo de autenticación
   const jwtService = app.get(JwtService);

 
   // Configura el guard globalmente
   app.useGlobalGuards(new AuthGuard(jwtService));  


   // Configurar la política de Referer
    app.use((req, res, next) => {
      res.header('Referrer-Policy', 'no-referrer-when-downgrade');
      next();
    });
  await app.listen(3000);
}
bootstrap();
