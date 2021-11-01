// import { Injectable } from '@nestjs/common';
// import { IGitHubRepo } from '../models/github.model';
// import { GithubService } from '../services/github.service';

// @Injectable()
// export class GitHubHelper {
//   constructor(private readonly gitHubService: GithubService) {}

//   public setBranchesToRepos(
//     userName,
//     repos: IGitHubRepo[],
//   ): Observable<IGitHubRepo[]> {
//     // const promises = [];
//     repos.map((repo) => {
//       promises.push(
//         ((repo) => {
//           let branches = this.gitHubService.fetchBranches(userName, repo);
//           branches.map((i) => {
//             repo.branches.push(i);
//           });
//         })(repo),
//       );
//     });

//      Promise.all(promises);

//     return repos;
//   }

//   private setBranchesToRepos(
//     repos: Repository[],
//     user: User,
//     headersForGitHub: HeadersForGit,
//   ): Observable<Repository[]> {
//     const reposWithBranches = repos.map((repo, repoIdx) =>
//       this.getBranches(user, repo, headersForGitHub).pipe(
//         map((branches) => {
//           repos[repoIdx].branches = branches;
//           return repos[repoIdx];
//         }),
//       ),
//     );
//     return forkJoin(reposWithBranches);
//   }

// }
