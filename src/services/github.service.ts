import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { HttpConsumingService } from './http.service';
import {
  IBranchesResponse,
  IBranch,
  IGitHubRepoResponse,
  IGithubRepository,
} from '../models/github.model';
import {
  forkJoin,
  mergeMap,
  concatMap,
  Observable,
  defaultIfEmpty,
  catchError,
} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GithubService {
  public constructor(private httpService: HttpConsumingService) {}

  fetchNotForkedGitHubRepos(username): Observable<IGitHubRepoResponse[]> {
    return this.httpService
      .get<IGithubRepository[]>(
        `${process.env.BASE_URL}/users/${username}/repos`,
      )
      .pipe(
        catchError((err) => {
          if (err.response && err.response.status === HttpStatus.NOT_FOUND) {
            throw new NotFoundException({
              status: HttpStatus.NOT_FOUND,
              message: 'GitHub user not found',
            });
          }
          throw err;
        }),
        map((repos: IGithubRepository[]) =>
          repos.filter((r: IGithubRepository) => {
            return r.fork === false;
          }),
        ),
        mergeMap((repos: IGithubRepository[]) =>
          // use mergeMap instead of concatMap it is more faster
          forkJoin(
            repos.map((repo: IGithubRepository) => {
              let setBranchesToRepos = this.setBranchesToRepos(username, repo);
              return setBranchesToRepos;
            }),
          ).pipe(defaultIfEmpty([])),
        ),
      );
  }

  private setBranchesToRepos(user, repo): Observable<IGitHubRepoResponse> {
    return this.fetchBranches(user, repo.name).pipe(
      map((branches: IBranchesResponse[]) => {
        return {
          repo_name: repo.name,
          owner_login: repo?.owner?.login,
          fork: repo.fork,
          branches,
        };
      }),
    );
  }
  fetchBranches(username, repoName): Observable<IBranchesResponse[]> {
    return this.httpService
      .get<IBranch[]>(
        `${process.env.BASE_URL}/repos/${username}/${repoName}/branches`,
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
}
