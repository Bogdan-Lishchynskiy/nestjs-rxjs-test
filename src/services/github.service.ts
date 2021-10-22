import { Injectable } from '@nestjs/common';
import { HttpService } from './http.service';
import { IBranches, IGitHubRepo } from '../models/github.model';

@Injectable()
export class GithubService {
  public constructor(private httpService: HttpService) {}

  async fetchNotForkedGitHubRepos(username): Promise<IGitHubRepo[]> {
    let res = await this.httpService.get(
      `${process.env.BASE_URL}/users/${username}/repos`,
    );
    return res.data
      .filter((r) => r.fork === false)
      .map((i) => {
        return <IGitHubRepo>{
          repo_name: i.name,
          owner_login: i.owner.login,
          fork: i.fork,
          branches: [],
        };
      });
  }
  async fetchBranches(username, repo): Promise<IBranches[]> {
    let result = await this.httpService.get(
      `${process.env.BASE_URL}/repos/${username}/${repo.repo_name}/branches`,
    );
    return result.data.map((i) => {
      return <IBranches>{
        name: i.name,
        commit: i.commit.sha,
      };
    });
  }
}
