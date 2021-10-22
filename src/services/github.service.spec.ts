import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { HttpService } from '../services/http.service';
import { IBranches, IGitHubRepo } from '../models/github.model';

describe('Test for GithubService', () => {
  let githubService: GithubService;
  let httpService: HttpService;
  const mockUser = 'Bogdan-Lishchynskiy';
  const fakeUrl = `https/example/${mockUser}`;

  const mockData = {
    data: [
      {
        repo_name: 'repo-css',
        fork: false,
        owner: { login: 'Bogdan-Lishchynskiy' },
      },
      {
        repo_name: 'repo-html',
        fork: false,
        owner: { login: 'Bogdan-Lishchynskiy' },
      },
      {
        repo_name: 'repo-js',
        fork: false,
        owner: { login: 'Bogdan-Lishchynskiy' },
      },
    ],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };
  const mockHttpService = {
    get: jest.fn((fakeUrl) => {
      return mockData;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubService, HttpService],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    githubService = module.get<GithubService>(GithubService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(githubService).toBeDefined();
  });

  it('should be defined', () => {
    expect(httpService).toBeDefined();
  });

  it('fetchNotForkedGitHubRepos should return not forked repositories', async () => {
    const repos = (await githubService.fetchNotForkedGitHubRepos(
      mockUser,
    )) as IGitHubRepo[];
    expect(repos.length).toEqual(3);
    expect(repos[0].fork).toBeFalsy();
    expect(repos).toContainEqual(repos[0]);
    expect(httpService.get(fakeUrl)).toEqual(mockData);
    expect(httpService.get).toHaveBeenCalled();
    expect(httpService.get).toHaveBeenCalledWith(fakeUrl);
  });

  it('fetchBranches should return ', async () => {
    const repos = (await githubService.fetchNotForkedGitHubRepos(
      mockUser,
    )) as IGitHubRepo[];
    expect(repos.length).toEqual(3);
    expect(repos[0].fork).toBeFalsy();
    expect(repos).toContainEqual(repos[0]);
    expect(httpService.get(fakeUrl)).toEqual(mockData);
    expect(httpService.get).toHaveBeenCalled();
    expect(httpService.get).toHaveBeenCalledWith(fakeUrl);
  });
});
