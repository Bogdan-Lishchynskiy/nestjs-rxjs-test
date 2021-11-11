import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from '../../services/github.service';
import { IGitHubRepoResponse } from '../../models/github.model';
import { Observable } from 'rxjs';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Controller('/api')
export class GithubController {
  constructor(private readonly gitHubService: GithubService) {}

  @Get('/not-forked-repositories/:userName')
  getGitRepoData(
    @Param('userName') userName: string,
  ): Observable<IGitHubRepoResponse[]> {
    // console.log('insode ctrl = = = =');
    // throw new HttpException({
    //   status: HttpStatus.NOT_FOUND,
    //   error: 'Access to this site is forbidden',
    //   }, 404);
    return this.gitHubService.fetchNotForkedGitHubRepos(userName);
  }
}
