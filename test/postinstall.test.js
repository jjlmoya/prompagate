import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
	existsSync,
	mkdtempSync,
	mkdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const postinstall = join(repositoryRoot, "scripts", "postinstall.js");

function runPostinstall(targetRoot) {
	execFileSync(process.execPath, [postinstall], {
		cwd: repositoryRoot,
		env: { ...process.env, INIT_CWD: targetRoot },
		stdio: "pipe",
	});
}

function withTemporaryProject(run) {
	const project = mkdtempSync(join(tmpdir(), "prompagate-"));
	try {
		run(project);
	} finally {
		rmSync(project, { recursive: true, force: true });
	}
}

test("propagates prompts, skills and Vitest guards", () => {
	withTemporaryProject((project) => {
		runPostinstall(project);

		const expected = [
			join(project, "prompts", "create-tool.md"),
			join(project, "prompts", "i18n", "en.md"),
			join(project, ".agents", "skills", "gamebob-tool-qa", "SKILL.md"),
			join(project, ".agents", "skills", "create-tool", "SKILL.md"),
			join(project, ".opencode", "skills", "create-tool", "SKILL.md"),
			join(project, ".claude", "skills", "create-tool", "SKILL.md"),
			join(project, ".gemini", "skills", "create-tool", "SKILL.md"),
			join(project, ".agent", "skills", "create-tool", "SKILL.md"),
			join(project, "src", "tests", "qa_runtime_i18n.test.ts"),
			join(project, "src", "tests", "qa_logic_reference_coverage.test.ts"),
			join(project, "src", "tests", "qa_claim_evidence.test.ts"),
			join(project, "src", "tests", "qa_bibliography_links.test.ts"),
		];

		for (const path of expected) {
			assert.equal(existsSync(path), true, `Expected propagated file: ${path}`);
		}
	});
});

test("updates the managed create-tool skill on reinstall", () => {
	withTemporaryProject((project) => {
		const managedSkill = join(project, ".agents", "skills", "create-tool", "SKILL.md");
		mkdirSync(dirname(managedSkill), { recursive: true });
		writeFileSync(managedSkill, "obsolete project copy\n", "utf8");

		runPostinstall(project);

		assert.notEqual(readFileSync(managedSkill, "utf8"), "obsolete project copy\n");
		assert.match(readFileSync(managedSkill, "utf8"), /English-first gate/);
	});
});

test("does not overwrite project customizations", () => {
	withTemporaryProject((project) => {
		const customizedFiles = [
			join(project, "prompts", "i18n", "en.md"),
			join(project, ".agents", "skills", "gamebob-tool-qa", "SKILL.md"),
			join(project, "src", "tests", "qa_runtime_i18n.test.ts"),
		];

		for (const path of customizedFiles) {
			mkdirSync(dirname(path), { recursive: true });
			writeFileSync(path, "project-owned\n", "utf8");
		}

		runPostinstall(project);

		for (const path of customizedFiles) {
			assert.equal(readFileSync(path, "utf8"), "project-owned\n");
		}
	});
});
