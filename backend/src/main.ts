import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(cookieParser());
  
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')
  
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin']
  })
  
  const port = 5000 || process.env.PORT
  await app.listen(port);
  console.log(`server is running at port ${port}`)

}

bootstrap();

