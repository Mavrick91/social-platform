import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log(process.env.JWT_SECRET); // Log the JWT_SECRET environment variable
  await app.listen(3000);
}
bootstrap();
