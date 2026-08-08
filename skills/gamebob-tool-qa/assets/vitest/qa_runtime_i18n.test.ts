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

interface VisibleLiteral {
  line: number;
  value: string;
}

const domTextAssignment = /\.(?:innerText|textContent|innerHTML)\s*=/;
const quotedLiteral = /(['"`])((?:\\.|(?!\1).)*)\1/g;

function visibleWords(value: string): string {
  return value
    .replace(/\$\{[^}]*\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/[\d\p{P}\p{S}_]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isTechnicalLiteral(value: string): boolean {
  return ['.', '#', '['].some((prefix) => value.startsWith(prefix))
    || /^data-[a-z0-9-]+$/i.test(value);
}

function hardcodedVisibleLiterals(source: string): VisibleLiteral[] {
  const failures: VisibleLiteral[] = [];

  source.split(/\r?\n/).forEach((line, index) => {
    if (!domTextAssignment.test(line)) return;

    const assignment = line.slice(line.search(domTextAssignment));
    for (const match of assignment.matchAll(quotedLiteral)) {
      if (isTechnicalLiteral(match[2])) continue;
      const words = visibleWords(match[2]);
      if (words && /\p{L}/u.test(words)) {
        failures.push({ line: index + 1, value: match[2] });
      }
    }
  });

  return failures;
}

function runtimeSources(toolDirectory: string): string {
  return findFiles(toolDirectory, ['.astro', '.ts', '.js'])
    .filter((path) => !path.includes(`${join(toolDirectory, 'i18n')}`))
    .filter((path) => basename(path) !== 'ui.ts')
    .map(read)
    .join('\n');
}

describe('QA: runtime copy is localized', () => {
  const componentFiles = findFiles(join(repositoryRoot, 'src', 'tool'), ['.astro']);

  it('does not write user-facing string literals directly into the DOM', () => {
    const failures = componentFiles.flatMap((path) =>
      hardcodedVisibleLiterals(read(path)).map(
        ({ line, value }) => `${displayPath(path)}:${line} -> ${JSON.stringify(value)}`,
      ),
    );

    expect(
      failures,
      `Move visible browser copy to the tool UI locale contract:\n${failures.join('\n')}`,
    ).toEqual([]);
  });

  it('uses every string declared by each UI locale contract', () => {
    const failures: string[] = [];

    for (const directory of listToolDirectories()) {
      const uiPath = join(directory, 'ui.ts');
      if (!existsSync(uiPath)) continue;

      const keys = Array.from(read(uiPath).matchAll(/^\s*(\w+)\??:\s*string\s*;/gm), (match) => match[1]);
      const runtime = runtimeSources(directory);
      const unused = keys.filter((key) => !new RegExp(`\\b${key}\\b`).test(runtime));

      if (unused.length > 0) {
        failures.push(`${displayPath(uiPath)} -> unused: ${unused.join(', ')}`);
      }
    }

    expect(
      failures,
      `Unused locale keys are dead copy or may mean the browser bypasses translations:\n${failures.join('\n')}`,
    ).toEqual([]);
  });
});
