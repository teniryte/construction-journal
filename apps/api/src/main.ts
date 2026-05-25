import { NestFactory } from '@nestjs/core';
import type { ConfigType } from '@nestjs/config';
import { APP_CONFIG_TOKEN, appConfig } from './app/app.config';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigType<typeof appConfig>>(APP_CONFIG_TOKEN);

  app.enableCors();
  await app.listen(config.port);
}
void bootstrap();
