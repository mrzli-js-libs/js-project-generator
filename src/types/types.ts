export interface Config {
  readonly placeholders: Placeholders;
  readonly dependencies: readonly string[];
  readonly devDependencies: readonly string[];
}

export interface Placeholders {
  readonly scopeName: string;
  readonly projectName: string;
  readonly author: string;
  readonly email: string;
  readonly githubUserOrOrg: string;
}

export interface DependencyWithVersion {
  readonly name: string;
  readonly version: string;
}