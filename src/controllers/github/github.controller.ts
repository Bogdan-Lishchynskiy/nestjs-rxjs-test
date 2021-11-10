import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from '../../services/github.service';
import { IGitHubRepoResponse } from '../../models/github.model';
import { Observable } from 'rxjs';

@Controller('/api')
export class GithubController {
  constructor(private readonly gitHubService: GithubService) {}

  @Get('/not-forked-repositories/:userName')
  getGitRepoData(
    @Param('userName') userName: string,
  ): Observable<IGitHubRepoResponse[]> {
    return this.gitHubService.getAllReposWithBranches(userName);
  }
}
