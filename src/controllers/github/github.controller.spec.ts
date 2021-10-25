import { Test, TestingModule } from '@nestjs/testing';
// import { GithubController } from './github.controller';
// import { HttpService } from '../../services/http.service.ts';

import { GithubService } from '../../services/github.service';
describe('GithubController', () => {
  // let controller: GithubController;
  let githubService: GithubService;

  const mockGithubService = {
    get: jest.fn(() => {}),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // controllers: [GithubController],
      providers: [GithubService],
    })
      .overrideProvider(GithubService)
      .useValue(mockGithubService)
      .compile();

    githubService = module.get<GithubService>(GithubService);
    // controller = module.get<GithubController>(GithubController);
  });

  it('should be defined', () => {
    expect(githubService).toBeDefined();
  });
});
