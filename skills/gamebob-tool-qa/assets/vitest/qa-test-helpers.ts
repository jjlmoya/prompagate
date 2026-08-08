import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

export const repositoryRoot = process.cwd();
export const toolRoot = join(repositoryRoot, 'src', 'tool');

export function listToolDirectories(): string[] {
  return readdirSync(toolRoot)
    .map((name) => join(toolRoot, name))
    .filter((path) => statSync(path).isDirectory());
}

export function findFiles(directory: string, extensions: string[]): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...findFiles(path, extensions));
    else if (extensions.some((extension) => entry.name.endsWith(extension))) files.push(path);
  }

  return files;
}

export function read(path: string): string {
  return readFileSync(path, 'utf8');
}

export function displayPath(path: string): string {
  return relative(repositoryRoot, path).replace(/\\/g, '/');
}

