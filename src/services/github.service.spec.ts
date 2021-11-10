import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { HttpConsumingService } from '../services/http.service';
import { IBranchesResponse, IGitHubRepoResponse } from '../models/github.model';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
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
  // const mockHttpService = {
  //   // httpClientSpy.get.and.returnValue(of(expectedTarifs));
  //   get: jest.fn((u) => {
  //     if (u === fakeUrlRep) return of(mockDataGithubRepo);
  //     else return of(mockDataBranches);
  //   }),
  // };

  const expectedRepo = [
    {
      repo_name: 'repo-css',
      fork: false,
      owner_login: 'Bogdan-Lishchynskiy',
      branches: [],
    },
    {
      repo_name: 'repo-html',
      fork: false,
      owner_login: 'Bogdan-Lishchynskiy',
      branches: [],
    },
    {
      repo_name: 'repo-js',
      fork: false,
      owner_login: 'Bogdan-Lishchynskiy',
      branches: [],
    },
  ];
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

    const repos = githubService.fetchNotForkedGitHubRepos(mockUser);
    repos.subscribe({
      next: (response: IGitHubRepoResponse[]) => {
        expect(response).toEqual(expectedRepo);
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
        expect(response).toContainEqual(response[0]);
        done();
      },
      error: (error: Error) => done.fail(error),
    });
  });

  it('setBranchesToRepos should return repo with branches', (done: DoneCallback) => {
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockDataGithubRepo));

    const repos = githubService.fetchNotForkedGitHubRepos(mockUser);
    repos.subscribe({
      next: (response: IGitHubRepoResponse[]) => {
        expect(response).toEqual(expectedRepo);
        expect(response.length).toEqual(3);
        expect(response[0].repo_name).toEqual('repo-css');
        expect(response).toContainEqual(response[0]);
        done();
      },
      error: (error: Error) => done.fail(error),
    });
  });
});
