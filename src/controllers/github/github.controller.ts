import { Controller, Get } from "@nestjs/common";
import { GithubService } from '../../services/github.service';
import { GitHubRepo } from '../../models/github.model';
// import { Observable } from 'rxjs';

@Controller('/github')
export class GithubController {
  constructor(private readonly gitHubService: GithubService) {}

  @Get()
  getGitRepoData(): Promise<GitHubRepo[]> {
    return this.gitHubService.fetchGitHubRepos();
  }
}
