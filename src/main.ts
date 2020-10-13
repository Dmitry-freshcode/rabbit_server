import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const port = 7000;
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Rabbit service')
  .setDescription('The Rabbit API description')
  .setVersion('1.0')
  .addTag('rabbits')
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
app.enableCors(); 
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
await app.listen(port);
console.log(`server listen on ${process.env.APP_PORT} port`)
}
bootstrap();
