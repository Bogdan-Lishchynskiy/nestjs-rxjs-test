import { Injectable } from "@nestjs/common";
import { http } from '../http-client/http';
// import api from '../http-client/api'
import { GitHubRepo } from '../models/github.model'


@Injectable()
export class GithubService {
  async fetchGitHubRepos(): Promise<GitHubRepo[]> {
    let res = await http.get(`/users/${process.env.GITHUB_USER_NAME}/repos`)
    console.log('res.data = = =', res.data[0])

    return res.data[0];
  }
}