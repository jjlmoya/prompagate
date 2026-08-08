import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { displayPath, listToolDirectories, read } from './qa-test-helpers';

const evidenceClaims = [
  /\bofficial algorithm\b/i,
  /\balgoritmo oficial\b/i,
  /\b(?:records|data|rates|tables) updated(?:\s+(?:to|through)\s+20\d{2})?\b/i,
  /\b(?:registros|datos|tasas|tablas) actualizad[oa]s?(?:\s+(?:a|hasta)\s+20\d{2})?\b/i,
  /\b(?:validated|verified) (?:method|algorithm|calculation)\b/i,
  /\b(?:método|algoritmo|cálculo) (?:validado|verificado)\b/i,
  /\b(?:guarantees|ensures)\b/i,
  /\bgarantiza\b/i,
  /\bofficial (?:data|rate|calculation)\b/i,
  /\b(?:datos|tasa|cálculo) oficial(?:es)?\b/i,
];

const requiredEvidenceFields = [
  'reviewedAt',
  'methodology',
  'sources',
  'referenceCases',
  'limitations',
];

describe('QA: strong factual claims are traceable', () => {
  it('requires machine-readable validation evidence beside tools making strong claims', () => {
    const failures: string[] = [];

    for (const directory of listToolDirectories()) {
      const localePaths = ['en', 'es']
        .map((locale) => join(directory, 'i18n', `${locale}.ts`))
        .filter(existsSync);
      const claims = localePaths.flatMap((path) => {
        const source = read(path);
        return evidenceClaims
          .filter((pattern) => pattern.test(source))
          .map((pattern) => `${displayPath(path)} matches ${pattern.source}`);
      });
      if (claims.length === 0) continue;

      const evidencePath = join(directory, 'validation.ts');
      if (!existsSync(evidencePath)) {
        failures.push(`${displayPath(evidencePath)} missing; claims: ${claims.join(' | ')}`);
        continue;
      }

      const evidence = read(evidencePath);
      const missingFields = requiredEvidenceFields.filter(
        (field) => !new RegExp(`\\b${field}\\s*:`).test(evidence),
      );
      if (missingFields.length > 0) {
        failures.push(`${displayPath(evidencePath)} missing fields: ${missingFields.join(', ')}`);
      }
    }

    expect(
      failures,
      [
        'Claims such as official, validated, guaranteed or updated need inspectable evidence.',
        'Add validation.ts with reviewedAt, methodology, sources, referenceCases and limitations,',
        'or weaken/remove the unsupported claim.',
        ...failures,
      ].join('\n'),
    ).toEqual([]);
  });
});

