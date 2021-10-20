import { Injectable } from '@nestjs/common';
import { http } from '../http-client/http';
import { IBranches, IGitHubRepo } from '../models/github.model';

@Injectable()
export class GithubService {
  async fetchNotForkedGitHubRepos(username): Promise<IGitHubRepo[]> {
    let res = await http.get(`${process.env.BASE_URL}/users/${username}/repos`);
    return res.data
      .filter((r) => r.fork === false)
      .map((i) => {
        return <IGitHubRepo>{
          repo_name: i.name,
          owner_login: i.owner.login,
          branches: [],
        };
      });
  }
  async fetchBranches(username, repo): Promise<IBranches[]> {
    let result = await http.get(
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
