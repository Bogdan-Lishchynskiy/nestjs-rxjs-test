export interface IGitHubRepo {
  repo_name: string;
  owner_login: string;
  fork: boolean;
  branches?: IBranches[];
}

export interface IBranches {
  name: string;
  commit: string;
}
