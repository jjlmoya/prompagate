import { describe, expect, it } from 'vitest';
import { basename, join } from 'node:path';
import { existsSync } from 'node:fs';
import {
  displayPath,
  findFiles,
  listToolDirectories,
  read,
  repositoryRoot,
} from './qa-test-helpers';

function hasDedicatedLogicTest(toolDirectory: string): boolean {
  const localCandidates = [
    join(toolDirectory, 'logic.test.ts'),
    join(toolDirectory, 'logic.spec.ts'),
    join(toolDirectory, '__tests__', 'logic.test.ts'),
    join(toolDirectory, '__tests__', 'logic.spec.ts'),
  ];
  if (localCandidates.some(existsSync)) return true;

  const toolName = basename(toolDirectory);
  const centralTests = findFiles(join(repositoryRoot, 'src', 'tests'), ['.test.ts', '.spec.ts']);
  return centralTests.some((testPath) => {
    const source = read(testPath).replace(/\\/g, '/');
    return source.includes(`/tool/${toolName}/logic`) || source.includes(`../tool/${toolName}/logic`);
  });
}

describe('QA: calculation logic has reference tests', () => {
  it('gives every public calculator logic module its own behavioral test suite', () => {
    const failures = listToolDirectories()
      .filter((directory) => existsSync(join(directory, 'logic.ts')))
      .filter((directory) => !hasDedicatedLogicTest(directory))
      .map((directory) => `${displayPath(join(directory, 'logic.ts'))} -> no test imports this module`);

    expect(
      failures,
      [
        'Add behavioral tests through each logic module public API.',
        'At minimum cover a documented reference case, boundaries, invalid input and invariants.',
        ...failures,
      ].join('\n'),
    ).toEqual([]);
  });
});

