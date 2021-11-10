export interface IGitHubRepoResponse {
  repo_name: string;
  owner_login: string;
  fork: boolean;
  branches?: IBranchesResponse[];
}

export interface IBranchesResponse {
  name: string;
  sha_commit: string;
}

export interface IBranch {
  name: string;
  commit: {
    sha: string;
  };
}

export interface IGithubRepository {
  name: string;
  fork: boolean;
  owner: {
    login: string;
  };
}
