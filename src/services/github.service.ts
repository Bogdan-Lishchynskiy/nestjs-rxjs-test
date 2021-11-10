import { Injectable } from '@nestjs/common';
import { HttpConsumingService } from './http.service';
import {
  IBranchesResponse,
  IBranch,
  IGitHubRepoResponse,
  IGithubRepository,
} from '../models/github.model';
import { forkJoin, mergeMap, Observable, defaultIfEmpty } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GithubService {
  public constructor(private httpService: HttpConsumingService) {}

  getAllReposWithBranches(username: string): Observable<IGitHubRepoResponse[]> {
    return this.fetchNotForkedGitHubRepos(username).pipe(
      mergeMap((repos) => {
        return this.setBranchesToRepos(username, repos);
      }),
    );
  }

  fetchNotForkedGitHubRepos(username): Observable<IGitHubRepoResponse[]> {
    return this.httpService
      .get<IGithubRepository[]>(
        `${process.env.BASE_URL}/users/${username}/repos`,
      )
      .pipe(
        map((repos: IGithubRepository[]) =>
          repos.filter((r: IGithubRepository) => r.fork === false),
        ),
        map((repos: IGithubRepository[]) =>
          repos.map((i: IGithubRepository) => {
            console.log(i);
            return {
              repo_name: i.name,
              owner_login: i.owner.login,
              fork: i.fork,
              branches: [],
            };
          }),
        ),
      );
  }
  fetchBranches(username, repo): Observable<IBranchesResponse[]> {
    return this.httpService
      .get<IBranch[]>(
        `${process.env.BASE_URL}/repos/${username}/${repo.repo_name}/branches`,
      )
      .pipe(
        map((br: IBranch[]) =>
          br.map((b: IBranch) => {
            return {
              name: b.name,
              sha_commit: b.commit.sha,
            };
          }),
        ),
      );
  }

  setBranchesToRepos(
    userName,
    repos: IGitHubRepoResponse[],
  ): Observable<IGitHubRepoResponse[]> {
    const reposWithBranches = repos.map((repo, i) =>
      this.fetchBranches(userName, repo).pipe(
        map((branches) => {
          repos[i].branches = branches;
          return repos[i];
        }),
      ),
    );
    return forkJoin(reposWithBranches).pipe(defaultIfEmpty([]));
  }
}
