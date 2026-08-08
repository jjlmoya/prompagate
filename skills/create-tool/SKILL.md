---
name: create-tool
description: Creates exceptional interactive utility tools in src/tool/ with a distinct visual concept, user-first UX, responsive light and dark themes, English-first delivery, and an explicit OKQA gate before localization and release. Use when creating a new tool in the jjlmoya utilities ecosystem.
---

# Create Tool

Create new interactive tools that are useful, visually memorable, technically sound, and specific to their domain. The implementation may share the repository architecture, contracts, and proven technical patterns, but its visual language, layout, interaction model, and metaphor must be designed for the individual tool. Never copy another tool's design because it is convenient.

## 1. Clarify only real ambiguities

Before changing files:

- Inspect the repository, its local instructions, package scripts, existing tool architecture, tests, and shared components.
- Do not ask the user for facts that can be discovered from the repository.
- If a missing requirement could materially change behavior, information architecture, visual direction, data model, persistence, localization, or release scope, ask one concise question. Include a brief concrete suggestion so the user can answer quickly.
- If there is no material ambiguity, start the implementation. Do not narrate the process or ask a long questionnaire.

## 2. English-first gate

The first implementation is a complete English baseline. Until the user writes exactly OKQA or okQA:

- Implement only i18n/en.ts and the English registration.
- Do not translate, create, or register the other 14 locales.
- Do not run lint, test, type-check, check, or equivalent quality gates.
- build is allowed when needed to catch compilation, bundling, Astro, or runtime registration mistakes.
- Write appropriate unit tests and QA-ready code, but do not execute the test suite before OKQA.
- Do not commit, push, publish, bump versions, or run release commands.

This gate exists to avoid translating or polishing production content before the user approves the English product direction.

## 3. Technical architecture

For a standard tool, use the repository's established structure under src/tool/<toolId>/:

- logic.ts: pure business logic and state transitions.
- logic.test.ts: meaningful normal-flow, edge-case, and completion tests.
- ui.ts: UI dictionary type and tool-specific UI contract.
- entry.ts: metadata, icons, routing, and locale loaders.
- index.ts: public tool exports.
- component.astro: the interactive tool surface only. It must start directly with the tool's working area; do not render a visible title, subtitle, intro, hero, marketing copy, "privacy first" panel, SEO copy, FAQ, bibliography, legal block, or generic editorial wrapper inside it.
- A tool-specific stylesheet in kebab-case with design tokens and light/dark rules.
- seo.astro: the SEO content container using the repository's shared renderer contract.
- bibliography.ts: relevant, real, authoritative sources.
- bibliography.astro: the shared bibliography component using the repository's required aliased import.
- i18n/en.ts: the complete English ToolLocaleContent<ToolUI> object.

Adapt the structure when the repository already has a more specific contract. Preserve type safety, registration, exports, and the existing shared component APIs. Do not invent fallback locale objects or incomplete registration entries.

The tool is the product surface, not an article header. Keep page-level title, subtitle, SEO, explanatory content, privacy messaging, FAQs, bibliography, and legal content outside the interactive component in the repository's established page/shared renderers. Inside the tool, show only what helps the user perform the task: the controls, the result, relevant status or feedback, and necessary control labels. A visible heading is not allowed inside the tool merely to name it. If semantics require a label, use the repository's established accessible mechanism without turning it into visible editorial content.

Non-negotiable code and content rules:

- No comments in TypeScript, Astro, CSS, JSON, or generated public content.
- No emojis in code, UI, logs, titles, metadata, SEO, or translations.
- Keep business logic independent from DOM and presentation.
- Give every interactive control an accessible name when the control requires one. Apply keyboard and screen-reader support according to the tool's interaction model; do not add meaningless accessibility markup just to satisfy a checkbox.
- Keep page content, metadata, UI strings, schemas, FAQs, how-to content, and bibliography internally consistent.
- Use real URLs and only sources relevant to the tool's subject. Never invent citations or use programming documentation as public bibliography.

## 4. Visual and interaction direction

Every tool must be visually engaging and domain-specific. A plain form, generic dashboard, or spreadsheet-like collection of inputs is not an acceptable default.

Before finalizing the baseline, make and record deliberate decisions about:

- The tool's visual metaphor, composition, hierarchy, color language, and information density.
- Which data can be shown as a chart, timeline, map, waveform, diagram, grid, preview, gauge, visual selector, comparison, or another domain-native representation.
- Which inputs can be removed, inferred, preset, combined, or moved directly into the visualization.
- How the remaining inputs can feel tactile and friendly through chips, segmented controls, sliders, drag interactions, previews, presets, or progressive disclosure.
- Immediate feedback for changes, success, invalid input, loading, empty state, and errors whenever those states exist in the tool.
- Responsive behavior from small mobile screens through wide desktop layouts.
- Light and dark theme behavior using the repository's design tokens.
- Motion that communicates cause and effect: transitions, hover and active feedback, result changes, focus, and state changes. Avoid decoration that slows or distracts from the task.
- Whether the tool benefits from local persistence. Decide per tool whether to store nothing, the latest state, multiple saved entries, history, favorites, presets, or only UI preferences. Include reset, replacement, and stale-data behavior when persistence is used. Do not add localStorage automatically.
- Relevant units and systems. If the tool deals with metric or imperial measurements, provide a complete, obvious conversion or system selector and keep the whole interface consistent.

Use the visual system of other tools only to understand technical conventions. Do not reuse another tool's layout, palette, visual metaphor, component composition, or interaction design unless the domain genuinely requires it and the reason is explicit.

Do not use browser automation or launch a browser for visual review. Review the implementation, build output, and available project artifacts directly.

## 5. English baseline review loop

After implementing the English baseline, before showing it to the user, perform the following review and apply the improvements found. Show the user the questions, concise answers, and changes applied. Do not hide this audit.

### Product and visual audit

- Is the tool immediately understandable without a long explanation?
- Does the interactive surface begin directly with the task, without a visible title, subtitle, intro, hero, "privacy first" block, SEO copy, FAQ, bibliography, legal block, or generic wrapper inside the tool?
- Does its visual language belong to this domain rather than to a generic template?
- Can the primary result be seen, compared, manipulated, or explored visually?
- Can any input be removed, inferred, preset, or embedded in the visualization?
- Are remaining controls friendly, tactile, discoverable, and comfortable on mobile?
- Does motion explain interaction and provide feedback without becoming noise?
- Are the light and dark themes both intentional and legible?
- Are responsive, loading, empty, error, success, and reset states handled when applicable?
- Is persistence useful for this specific tool, and is its exact storage model justified?
- Are units, metric or imperial systems, time zones, formats, and regional assumptions handled where relevant?
- Is the tool meaningfully different from every existing tool in visual direction and interaction, even when the architecture is shared?

### Content and SEO audit

- Does the SEO content answer real user questions and teach the user something useful?
- Does it provide enough meaningful depth to meet the repository's tested minimum word count without filler?
- Do sections such as comparisons, tables, tips, diagnostics, glossary, or pros and cons appear only when they improve comprehension or decision-making?
- Does the content serve the user first while also giving search engines clear, natural, authoritative topical coverage?
- Are titles non-redundant and free from forbidden hyphens or pipes?
- Are FAQs, how-to steps, schemas, claims, and bibliography relevant, accurate, and mutually consistent?

### Engineering audit

- Is the logic pure, testable, and separated from the UI?
- Are edge cases, invalid values, empty input, resets, persistence failures, and completion states considered?
- Are registration, icons, exports, locale loading, shared renderer contracts, and imports correct?
- Are controls named and usable according to the tool's actual interaction model?
- Is the implementation performant and free from avoidable complexity?
- Does the permitted build pass when it is useful to run it?

### Rejection criteria

Do not present the baseline as ready if any of these is true:

- It is essentially a generic form, table, or spreadsheet.
- It places a visible title, subtitle, intro, hero, "privacy first" block, SEO copy, FAQ, bibliography, legal block, or other editorial wrapper inside the interactive tool surface.
- The main data could be represented visually but is shown only as raw text or fields.
- It contains inputs that could be removed or replaced by direct manipulation.
- It has no meaningful interaction feedback.
- Its layout or visual identity is a copy of another tool.
- It ignores mobile, theme, or applicable accessibility needs.
- It stores state without a clear user benefit or cannot safely reset stored state.
- Its SEO is filler, generic, developer-oriented, or less useful than the tool itself.
- It contains unsupported claims, weak sources, broken bibliography contracts, or incomplete English content.

After the audit, present a brief handoff containing:

1. What was built.
2. The visual and interaction concept.
3. The audit questions with concise answers.
4. The improvements applied.
5. Any remaining decision or material limitation.
6. The permitted build result, if run.

Wait for user feedback. If the user requests another improvement cycle, apply it and repeat the audit and handoff. Do not translate or release until the user writes OKQA or okQA.

## 6. Production gate after OKQA

Only after the exact approval token is received:

1. Translate all content into the 15 production locales: de, en, es, fr, id, it, ja, ko, nl, pl, pt, ru, sv, tr, and zh.
2. Localize UI, metadata, SEO, FAQs, how-to content, schemas, bibliography labels, and slugs according to the repository rules. Do not copy English into non-English locales.
3. Register all locale loaders required by the tool and repository.
4. Run the final gates in this order:

   npm run type-check
   npm run lint
   npm run test
   npm run build

5. If every gate passes, execute the repository release chain exactly as configured:

   git add -A
   git commit
   git push
   npm run minor

Do not commit, push, or run npm run minor if any required gate fails. If a required script is absent or the release command fails, report the exact blocker and stop rather than inventing a replacement workflow. The user's explicit OKQA approval authorizes this final release chain.

## 7. Final handoff

Report the final result briefly in the user's language. Include the implemented tool, the checks and their results, localization status, and any release failure or limitation. Never claim a check passed unless it actually ran and passed.
