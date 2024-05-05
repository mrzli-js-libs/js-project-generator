import { GenerateInput, ProjectDataAppReact } from '../../../../types';

export function getScripts(input: GenerateInput): Record<string, string> {
  const { projectData } = input;
  const { kind: projectKind } = projectData;

  switch (projectKind) {
    case 'app-react': {
      return getScriptsReact(projectData);
    }
    case 'app-nest': {
      return getScriptsNest();
    }
    default: {
      return getScriptsPublished();
    }
  }
}

function getScriptsReact(
  projectData: ProjectDataAppReact,
): Record<string, string> {
  return getScriptsVite(projectData.storybook);
}

function getScriptsVite(storybook: boolean): Record<string, string> {
  const scriptsStorybook: Record<string, string> = storybook
    ? {
        storybook: 'storybook dev -p 6006',
        'build-storybook': 'storybook build',
      }
    : {};

  return {
    dev: 'vite',
    build: 'tsc && vite build',
    lint: 'eslint --fix . && prettier --write .',
    test: 'vitest run --passWithNoTests',
    testw: 'vitest watch --passWithNoTests',
    preview: 'vite preview',
    ...scriptsStorybook,
  };
}

function getScriptsNest(): Record<string, string> {
  return {
    build: 'shx rm -rf ./dist && nest build',
    format: 'prettier --write .',
    start: 'nest start',
    'start:dev': 'nest start --watch',
    'start:debug': 'nest start --debug --watch',
    'start:prod': 'node dist/src/main',
    lint: 'eslint --fix .',
    test: 'jest',
    'test:debug':
      'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
    'test:e2e': 'jest --config ./test/jest-e2e.json',
  };
}

function getScriptsPublished(): Record<string, string> {
  return {
    dev: 'ts-node src/index.ts',
    lint: 'eslint --fix . && prettier --write .',
    'lint:nofix': 'eslint . && prettier --check .',
    'test-only': 'jest --passWithNoTests',
    test: 'pnpm run lint && pnpm run test-only',
    clean: 'shx rm -rf ./dist',
    'build-only': 'pnpm run clean && tsc --project tsconfig.lib.json',
    build: 'pnpm run test && pnpm run build-only',
    'pac-only': 'npmpub pack',
    pac: 'pnpm run build && pnpm run pac-only',
    'pub-only': 'npmpub pub',
    pub: 'pnpm run pac && pnpm run pub-only',
  };
}
