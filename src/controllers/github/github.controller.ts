import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from '../../services/github.service';
import { IGitHubRepo } from '../../models/github.model';

@Controller('/api')
export class GithubController {
  constructor(private readonly gitHubService: GithubService) {}

  @Get('/not-forked-repositories/:userName')
  async getGitRepoData(
    @Param('userName') userName: string,
  ): Promise<IGitHubRepo[]> {
    const repos = await this.gitHubService.fetchNotForkedGitHubRepos(userName);
    const promises = [];
    repos.map((repo) => {
      promises.push(
        (async (repo) => {
          let branches = await this.gitHubService.fetchBranches(userName, repo);
          branches.map((i) => {
            repo.branches.push(i);
          });
        })(repo),
      );
    });

    await Promise.all(promises);

    return repos;
  }
}
