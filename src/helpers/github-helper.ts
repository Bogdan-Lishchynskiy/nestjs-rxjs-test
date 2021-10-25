import { Injectable } from '@nestjs/common';
import { IGitHubRepo } from '../models/github.model';
import { GithubService } from '../services/github.service';

@Injectable()
export class GitHubHelper {
  constructor(private readonly gitHubService: GithubService) {}

  public async setBranchesToRepos(
    userName,
    repos: IGitHubRepo[],
  ): Promise<IGitHubRepo[]> {
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
