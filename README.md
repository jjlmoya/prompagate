# prompagate

**Propagates localization prompts across the `@jjlmoya` ecosystem.**

A minimal, zero-config package that automatically distributes AI prompts to all projects that install it. Designed for the `@jjlmoya` utilities ecosystem to ensure consistent localization guidance across 15 languages.

## What it does

When `@jjlmoya/prompagate` is installed, a `postinstall` script runs and creates a `./prompts/i18n/` folder in your project with language-specific translation guidelines:

```
prompts/
└── i18n/
    ├── es.md  (Español)
    ├── en.md  (English)
    ├── pt.md  (Português)
    ├── pl.md  (Polski)
    ├── nl.md  (Nederlands)
    ├── zh.md  (中文)
    ├── ko.md  (한국어)
    ├── ja.md  (日本語)
    ├── tr.md  (Türkçe)
    ├── id.md  (Bahasa Indonesia)
    ├── it.md  (Italiano)
    ├── fr.md  (Français)
    ├── sv.md  (Svenska)
    ├── de.md  (Deutsch)
    └── ru.md  (Русский)
```

Each file contains localization guidelines for AI assistants, emphasizing **localization over translation** — writing naturally as a native speaker would.

## Installation

```bash
npm install @jjlmoya/prompagate
```

That's it. The prompts are automatically created in `./prompts/i18n/`.

## Why?

Consistent AI-assisted localization across the ecosystem. These prompts guide Claude and other AI tools to:
- Localize content, not translate it mechanically
- Write with a human voice
- Respect cultural context
- Preserve formatting and information integrity

## Safety

The script only creates files that don't already exist. If you customize a prompt locally, it won't be overwritten.

## Skipped in certain contexts

The script skips execution if:
- Running within the `prompagate` package itself (development)
- No `INIT_CWD` is set (unconventional install scenarios)

## Publishing new versions

```bash
npm run patch   # 1.0.0 → 1.0.1
npm run minor   # 1.0.0 → 1.1.0
npm run major   # 1.0.0 → 2.0.0
```

Each command automatically:
1. Bumps the version
2. Commits to git
3. Creates a git tag
4. Pushes to origin
5. Triggers GitHub Actions → NPM publish

## License

MIT
