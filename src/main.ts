import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './setup-swagger';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  const configService = app.get(ConfigService);

  await prismaService.enableShutdownHooks(app);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  if (configService.get('NODE_ENV', 'production') === 'development') {
    setupSwagger(app);
  }
  await app.listen(configService.get('PORT', 3000));
  console.info(`Server running on port ${configService.get('PORT', 3000)}`);
}
bootstrap();
