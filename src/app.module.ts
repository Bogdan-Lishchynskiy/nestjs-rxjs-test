import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { GithubController } from './controllers/github/github.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { GithubService } from './services/github.service';
import { HttpService } from './services/http.service';
import { GitHubHelper } from './helpers/github-helper';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, GithubController],
  providers: [AppService, GithubService, HttpService, GitHubHelper],
})
export class AppModule {}
