import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcOptions } from './grpc.option';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grpcOptions)
  await app.startAllMicroservices()
}
bootstrap();
