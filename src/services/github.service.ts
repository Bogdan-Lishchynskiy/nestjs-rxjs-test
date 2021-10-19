import { Injectable } from '@nestjs/common';
import { Observable, take } from 'rxjs';
// import { http } from '../http-client/http';
import api from '../http-client/api'
import { GitHubRepo } from '../models/github.model'
const CircularJSON = require('flatted');


@Injectable()
export class GithubService {
  fetchGitHubRepos(): Observable<GitHubRepo[]> {
   let res = api.get<GitHubRepo[]>(`/users/Bogdan-Lishchynskiy/repos`).subscribe({
      next: value => console.log(value[0]),
      error: err => console.log(err),
  })
      
    return CircularJSON.stringify(res) as any;
  }
}