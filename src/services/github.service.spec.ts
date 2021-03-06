import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { HttpConsumingService } from '../services/http.service';
import { IBranchesResponse, IGitHubRepoResponse } from '../models/github.model';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import DoneCallback = jest.DoneCallback;

describe('Test for GithubService', () => {
  let githubService: GithubService;
  let httpService: HttpService;
  let httpConsumingService: HttpConsumingService;
  const mockUser = 'Bogdan-Lishchynskiy';
  const mockRepoName = 'repo-css';

  const mockDataGithubRepo: AxiosResponse = {
    data: [
      {
        name: 'repo-css',
        fork: false,
        owner: { login: 'Bogdan-Lishchynskiy' },
      },
      {
        name: 'repo-html',
        fork: false,
        owner: { login: 'Bogdan-Lishchynskiy' },
      },
      {
        name: 'repo-js',
        fork: false,
        owner: { login: 'Bogdan-Lishchynskiy' },
      },
    ],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };
  const mockDataBranches: AxiosResponse = {
    data: [
      {
        name: 'master',
        commit: { sha: '57523742631876181d95bc268e09fb3fd1a4d85e' },
      },
      {
        name: 'feature',
        commit: { sha: '67523742631876181d95bc268e09fb3fd1a4d85c' },
      },
    ],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  const expectedBranches = [
    {
      name: 'master',
      sha_commit: '57523742631876181d95bc268e09fb3fd1a4d85e',
    },
    {
      name: 'feature',
      sha_commit: '67523742631876181d95bc268e09fb3fd1a4d85c',
    },
  ];

  const expectedRepoWithBranches = [
    {
      repo_name: 'repo-css',
      owner_login: 'Bogdan-Lishchynskiy',
      fork: false,
      branches: [
        {
          name: 'master',
          sha_commit: '57523742631876181d95bc268e09fb3fd1a4d85e',
        },
        {
          name: 'feature',
          sha_commit: '67523742631876181d95bc268e09fb3fd1a4d85c',
        },
      ],
    },
    {
      repo_name: 'repo-html',
      owner_login: 'Bogdan-Lishchynskiy',
      fork: false,
      branches: [
        {
          name: 'master',
          sha_commit: '57523742631876181d95bc268e09fb3fd1a4d85e',
        },
        {
          name: 'feature',
          sha_commit: '67523742631876181d95bc268e09fb3fd1a4d85c',
        },
      ],
    },
    {
      repo_name: 'repo-js',
      owner_login: 'Bogdan-Lishchynskiy',
      fork: false,
      branches: [
        {
          name: 'master',
          sha_commit: '57523742631876181d95bc268e09fb3fd1a4d85e',
        },
        {
          name: 'feature',
          sha_commit: '67523742631876181d95bc268e09fb3fd1a4d85c',
        },
      ],
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubService, HttpConsumingService],
      imports: [HttpModule],
    }).compile();

    githubService = module.get<GithubService>(GithubService);
    httpService = module.get<HttpService>(HttpService);
    httpConsumingService =
      module.get<HttpConsumingService>(HttpConsumingService);
  });

  it('should be defined', () => {
    expect(githubService).toBeDefined();
  });

  it('should be defined', () => {
    expect(httpService).toBeDefined();
  });

  it('fetchNotForkedGitHubRepos should return not forked repositories', (done: DoneCallback) => {
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockDataGithubRepo));
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockDataBranches));

    const repos = githubService.fetchNotForkedGitHubRepos(mockUser);
    repos.subscribe({
      next: (response: IGitHubRepoResponse[]) => {
        expect(response).toEqual(expectedRepoWithBranches);
        expect(response.length).toEqual(3);
        expect(response[0].repo_name).toEqual('repo-css');
        expect(response).toContainEqual(response[0]);
        done();
      },
      error: (error: Error) => done.fail(error),
    });
  });

  it('fetchBranches should return name and commit sha', (done: DoneCallback) => {
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockDataBranches));
    const branches = githubService.fetchBranches(mockUser, mockRepoName);

    branches.subscribe({
      next: (response: IBranchesResponse[]) => {
        expect(response).toEqual(expectedBranches);
        expect(response.length).toEqual(2);
        expect(response[0].name).toEqual('master');
        expect(response[0]).toEqual(expectedBranches[0]);
        expect(response).toContainEqual(response[0]);

        done();
      },
      error: (error: Error) => done.fail(error),
    });
  });
});
