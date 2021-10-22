import { Test, TestingModule } from '@nestjs/testing';
import { GithubController } from './github.controller';
// import { HttpService } from '../../services/http.service.ts';

import { GithubService } from '../../services/github.service';
describe('GithubController', () => {
  let controller: GithubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [GithubController],
      providers: [GithubService],
    }).compile();

    controller = module.get<GithubController>(GithubController);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
