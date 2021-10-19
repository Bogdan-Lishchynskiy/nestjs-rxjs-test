import { Module } from '@nestjs/common';
import { GithubService } from '../services/github.service';
import { GithubController } from '../controllers/github/github.controller';

@Module({
  providers: [GithubService],
  controllers: [GithubController]
})
export class GithubModule {}
