import { Test, TestingModule } from '@nestjs/testing';
import { GithubController } from './github.controller';
import { GitHubHelper } from '../../helpers/github-helper';
import { GithubService } from '../../services/github.service';
import { HttpService } from '../../services/http.service';
import { IGitHubRepo } from '../../models/github.model';

describe('GithubController', () => {
  let controller: GithubController;
  let gitHubHelper: GitHubHelper;
  const mockUser = 'Bogdan-Lishchynskiy';

  const mockDataGithubRepos = [
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

  const setBranchesToRepos = [
    {
      repo_name: 'repo-css',
      fork: false,
      owner_login: 'Bogdan-Lishchynskiy',
      branches: [
        {
          name: 'master',
          commit: { sha: '57523742631876181d95bc268e09fb3fd1a4d85c' },
        },
      ],
    },
    {
      repo_name: 'repo-html',
      fork: false,
      owner_login: 'Bogdan-Lishchynskiy',
      branches: [
        {
          name: 'feature',
          commit: { sha: '57523742631876181d95bc268e09fb3fd1a4d85d' },
        },
      ],
    },
    {
      repo_name: 'repo-js',
      fork: false,
      owner_login: 'Bogdan-Lishchynskiy',
      branches: [
        {
          name: 'fix',
          commit: { sha: '57523742631876181d95bc268e09fb3fd1a4d85a' },
        },
      ],
    },
  ];

  const mockGitHubHelper = {
    setBranchesToRepos: jest.fn((mockUser, mockDataGithubRepos) => {
      return setBranchesToRepos;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubController],
      providers: [GitHubHelper, GithubService, HttpService],
    })
      .overrideProvider(GitHubHelper)
      .useValue(mockGitHubHelper)
      .compile();

    gitHubHelper = module.get<GitHubHelper>(GitHubHelper);
    controller = module.get<GithubController>(GithubController);
  });

  it('should be defined', () => {
    expect(gitHubHelper).toBeDefined();
  });
  it('GithubController should repos with branches inside each repo', async () => {
    const repos = (await gitHubHelper.setBranchesToRepos(
      mockUser,
      mockDataGithubRepos,
    )) as IGitHubRepo[];
    expect(repos.length).toEqual(3);
    expect(repos[0].fork).toBeFalsy();
    expect(repos).toContainEqual(repos[0]);
    expect(
      gitHubHelper.setBranchesToRepos(mockUser, mockDataGithubRepos),
    ).toEqual(setBranchesToRepos);
    expect(gitHubHelper.setBranchesToRepos).toHaveBeenCalled();
    expect(gitHubHelper.setBranchesToRepos).toHaveBeenCalledWith(
      mockUser,
      mockDataGithubRepos,
    );
  });
});
