import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from '../../services/github.service';
import { IGitHubRepo } from '../../models/github.model';
// import { GitHubHelper } from '../../helpers/github-helper';
import { Observable } from 'rxjs';

@Controller('/api')
export class GithubController {
  constructor(
    private readonly gitHubService: GithubService, // private readonly gitHubHelper: GitHubHelper,
  ) {}

  @Get('/not-forked-repositories/:userName')
  getGitRepoData(
    @Param('userName') userName: string,
  ): Observable<IGitHubRepo[]> {
    return this.gitHubService.getAllRepos(userName);
  }
}
