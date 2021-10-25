import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from '../services/github.service';
import { IBranches, IGitHubRepo } from '../models/github.model';
import { GitHubHelper } from '../helpers/github-helper';

describe('GithubController', () => {
  let githubService: GithubService;
  let gitHubHelper: GitHubHelper;
  const mockUser = 'Bogdan-Lishchynskiy';
  const mockDataGithubRepo = [
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
  const repo = {
    repo_name: 'repo-css',
    fork: false,
    owner_login: 'Bogdan-Lishchynskiy',
    branches: [],
  };
  const mockDataBranches = [
    {
      name: 'master',
      commit: { sha: '57523742631876181d95bc268e09fb3fd1a4d85e' },
    },
    {
      name: 'feature',
      commit: { sha: '67523742631876181d95bc268e09fb3fd1a4d85c' },
    },
  ];
  const mockGithubService = {
    fetchBranches: jest.fn((mockUser, repo) => {
      return mockDataBranches;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubService, GitHubHelper],
    })
      .overrideProvider(GithubService)
      .useValue(mockGithubService)
      .compile();

    githubService = module.get<GithubService>(GithubService);
    gitHubHelper = module.get<GitHubHelper>(GitHubHelper);
  });

  it('should be defined', () => {
    expect(githubService).toBeDefined();
  });

  it('setBranchesToRepos should set branches with commit to repo', async () => {
    const repos = (await gitHubHelper.setBranchesToRepos(
      mockUser,
      mockDataGithubRepo,
    )) as IGitHubRepo[];
    expect(repos.length).toEqual(3);
    expect(repos[0].fork).toBeFalsy();
    expect(repos).toContainEqual(repos[0]);
    expect(mockGithubService.fetchBranches(mockUser, repo)).toEqual(
      mockDataBranches,
    );
    expect(mockGithubService.fetchBranches).toHaveBeenCalled();
    expect(mockGithubService.fetchBranches).toHaveBeenCalledWith(
      mockUser,
      repo,
    );
  });
});
