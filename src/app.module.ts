import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { GithubController } from './controllers/github/github.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
// import { HttpModule } from '@nestjs/axios';
import { GithubService } from './services/github.service';
import { HttpService } from './services/http.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, GithubController],
  providers: [AppService, GithubService, HttpService],
})
export class AppModule {}
