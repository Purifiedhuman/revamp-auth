import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { urlencoded } from 'express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../', 'public'));
  app.setBaseViewsDir(join(__dirname, '../', 'views'));
  app.setViewEngine('ejs');

  app.use('/interaction', urlencoded({ extended: false }));

  const PORT = 3001;
  await app.listen(PORT);

  const logger = new Logger(`techtants-oidc-provider`);
  logger.log(`Listening on port ${PORT}`);
  logger.log(
    `Discovery endpoint: http://localhost:${PORT}/oidc/.well-known/openid-configuration`,
  );
}
bootstrap();
