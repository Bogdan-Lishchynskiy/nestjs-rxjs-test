import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { GithubController } from './controllers/github/github.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { GithubService } from './services/github.service';
import { HttpConsumingService } from './services/http.service';
import { HttpModule } from '@nestjs/axios';

// import { GitHubHelper } from './helpers/github-helper';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, GithubController],
  providers: [AppService, GithubService, HttpConsumingService],
})
export class AppModule {}
