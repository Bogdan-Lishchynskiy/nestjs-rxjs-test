import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from '../../services/github.service';
import { IGitHubRepo } from '../../models/github.model';
import { GitHubHelper } from '../../helpers/github-helper';

@Controller('/api')
export class GithubController {
  constructor(
    private readonly gitHubService: GithubService,
    private readonly gitHubHelper: GitHubHelper,
  ) {}

  @Get('/not-forked-repositories/:userName')
  async getGitRepoData(
    @Param('userName') userName: string,
  ): Promise<IGitHubRepo[]> {
    const repos = await this.gitHubService.fetchNotForkedGitHubRepos(userName);
    const result = await this.gitHubHelper.setBranchesToRepos(userName, repos);
    return result;
  }
}
