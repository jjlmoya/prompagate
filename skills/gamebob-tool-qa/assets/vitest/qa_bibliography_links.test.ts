import { describe, expect, it } from 'vitest';
import { ALL_TOOLS } from '../tools';
import type { ToolLocaleContent } from '../types';

interface LinkFailure {
  tool: string;
  message: string;
}

describe('QA: bibliography links are specific and usable', () => {
  it('uses unique HTTPS links to exact source pages instead of generic homepages', async () => {
    const failures: LinkFailure[] = [];

    for (const tool of ALL_TOOLS) {
      const loader = tool.entry.i18n.en;
      if (!loader) {
        failures.push({ tool: tool.entry.id, message: 'English locale loader is missing' });
        continue;
      }

      const content = (await loader()) as ToolLocaleContent;
      const seen = new Set<string>();

      for (const entry of content.bibliography ?? []) {
        let url: URL;
        try {
          url = new URL(entry.url);
        } catch {
          failures.push({ tool: tool.entry.id, message: `invalid URL: ${entry.url}` });
          continue;
        }

        if (url.protocol !== 'https:') {
          failures.push({ tool: tool.entry.id, message: `non-HTTPS URL: ${entry.url}` });
        }
        if (url.pathname === '/' && !url.search && !url.hash) {
          failures.push({ tool: tool.entry.id, message: `generic homepage, cite the exact document: ${entry.url}` });
        }
        if (seen.has(url.href)) {
          failures.push({ tool: tool.entry.id, message: `duplicate source URL: ${entry.url}` });
        }
        seen.add(url.href);
      }
    }

    const messages = failures.map(({ tool, message }) => `${tool}: ${message}`);
    expect(messages, `Bibliography hygiene failures:\n${messages.join('\n')}`).toEqual([]);
  });
});

