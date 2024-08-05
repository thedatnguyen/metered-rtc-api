import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { CustomException } from './common/filters/exceptions.filter';
import { CustomValidationPipe } from './common/pipes/validation.pipe';
// import { ValidationPipe } from './common/pipes/validation.pipe';

const bootstrap = async () => {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));

  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('ejs');
  app.useGlobalFilters(new CustomException());
  app.useGlobalPipes(
    new CustomValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  ); // custom
  await app.listen(process.env.LOCAL_PORT);
};
bootstrap();
