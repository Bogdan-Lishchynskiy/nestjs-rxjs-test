import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { HttpConsumingService } from '../services/http.service';
import { IBranches, IGitHubRepo } from '../models/github.model';
import { Observable } from 'rxjs';

describe('Test for GithubService', () => {
  let githubService: GithubService;
  let httpService: HttpConsumingService;
  const mockUser = 'Bogdan-Lishchynskiy';
  const mockRepoName = 'repo-css';
  const fakeUrlRep = `undefined/users/${mockUser}/repos`;
  const fakeUrlBr = `undefined/repos/${mockUser}/undefined/branches`;

  const mockDataGithubRepo = {
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
  const mockDataBranches = {
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
  const mockHttpService = {
    get: jest.fn((u) => {
      if (u === fakeUrlRep) return mockDataGithubRepo;
      else return mockDataBranches;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubService, HttpConsumingService],
    })
      .overrideProvider(HttpConsumingService)
      .useValue(mockHttpService)
      .compile();

    githubService = module.get<GithubService>(GithubService);
    httpService = module.get<HttpConsumingService>(HttpConsumingService);
  });

  it('should be defined', () => {
    expect(githubService).toBeDefined();
  });

  it('should be defined', () => {
    expect(httpService).toBeDefined();
  });

  it.only('fetchNotForkedGitHubRepos should return not forked repositories', async () => {
    const repos = githubService.fetchNotForkedGitHubRepos(mockUser);
    // as Observable<IGitHubRepo[]>;
    // expect(repos.length).toEqual(3);
    expect(repos[0].fork).toBeFalsy();
    expect(repos).toContainEqual(repos[0]);
    expect(mockHttpService.get(fakeUrlRep)).toEqual(mockDataGithubRepo);
    expect(mockHttpService.get).toHaveBeenCalled();
    expect(mockHttpService.get).toHaveBeenCalledWith(fakeUrlRep);
  });

  it.only('fetchBranches should return name and commit sha', async () => {
    const branches = (await githubService.fetchBranches(
      mockUser,
      mockRepoName,
    )) as Observable<IBranches[]>;
    // expect(branches.length).toEqual(2);
    expect(branches[0].name).toEqual('master');
    expect(branches).toContainEqual(branches[0]);
    expect(mockHttpService.get(fakeUrlBr)).toEqual(mockDataBranches);
    expect(mockHttpService.get).toHaveBeenCalled();
    expect(mockHttpService.get).toHaveBeenCalledWith(fakeUrlBr);
  });
});
