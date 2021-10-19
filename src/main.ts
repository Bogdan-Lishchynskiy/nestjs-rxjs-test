import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { GithubModule } from './github/github.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
