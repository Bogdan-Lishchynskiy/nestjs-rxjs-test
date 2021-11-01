import { Injectable } from '@nestjs/common';
import { HttpService } from './http.service';
import { IBranches, IGitHubRepo } from '../models/github.model';
import { forkJoin, mergeMap, Observable, defaultIfEmpty } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GithubService {
  public constructor(private httpService: HttpService) {}

  getAllRepos(username: string): Observable<IGitHubRepo[]> {
    return this.fetchNotForkedGitHubRepos(username).pipe(
      mergeMap((repos) => {
        return this.setBranchesToRepos(username, repos);
      }),
    );
  }

  fetchNotForkedGitHubRepos(username): Observable<IGitHubRepo[]> {
    return this.httpService
      .get(`${process.env.BASE_URL}/users/${username}/repos`)
      .pipe(
        map((repos) => repos.filter((r) => r.fork === false)),
        map((repos) =>
          repos.map((i) => {
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
  fetchBranches(username, repo): Observable<IBranches[]> {
    return this.httpService
      .get(
        `${process.env.BASE_URL}/repos/${username}/${repo.repo_name}/branches`,
      )
      .pipe(
        map((repos) =>
          repos.map((b) => {
            console.log(b.name);
            return <IBranches>{
              name: b.name,
              commit: b.commit.sha,
            };
          }),
        ),
      );
  }

  setBranchesToRepos(
    userName,
    repos: IGitHubRepo[],
  ): Observable<IGitHubRepo[]> {
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
