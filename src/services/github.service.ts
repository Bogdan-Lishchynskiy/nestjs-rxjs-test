import { Injectable } from '@nestjs/common';
import { HttpService } from './http.service';
import { IBranches, IGitHubRepo } from '../models/github.model';
import { catchError, forkJoin, mergeMap, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GithubService {
  public constructor(private httpService: HttpService) {}
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
  // async fetchBranches(username, repo): Promise<IBranches[]> {
  //   let result = await this.httpService.get(
  //     `${process.env.BASE_URL}/repos/${username}/${repo.repo_name}/branches`,
  //   );
  //   return result.data.map((b) => {
  //     return <IBranches>{
  //       name: b.name,
  //       commit: b.commit.sha,
  //     };
  //   });
  // }
}
