import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  const port = process.env.PORT || 3000;

await app.listen(port);
}
