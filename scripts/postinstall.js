import {
	existsSync,
	mkdirSync,
	readdirSync,
	copyFileSync,
	renameSync,
} from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const targetRoot = process.env.INIT_CWD;

if (!targetRoot || targetRoot === packageRoot) {
	process.exit(0);
}

function copyTree(sourceDir, targetDir, label, overwrite = false) {
	if (!existsSync(sourceDir)) return;
	mkdirSync(targetDir, { recursive: true });

	for (const entry of readdirSync(sourceDir, { withFileTypes: true })) {
		const source = join(sourceDir, entry.name);
		const target = join(targetDir, entry.name);

		if (entry.isDirectory()) {
			copyTree(source, target, label, overwrite);
			continue;
		}

		const targetExists = existsSync(target);
		if (overwrite || !targetExists) {
			copyFileSync(source, target);
			const action = overwrite && targetExists ? "updated" : "copied";
			console.log(`[@jjlmoya/prompagate] ${action} ${label}/${relative(sourceDir, source)}`);
		}
	}
}

function migrateVitestTemplates(sourceDir, targetDir) {
	if (!existsSync(sourceDir) || !existsSync(targetDir)) return;

	for (const entry of readdirSync(sourceDir, { withFileTypes: true })) {
		if (!entry.isFile() || !entry.name.endsWith(".template")) continue;

		const legacyName = entry.name.slice(0, -".template".length);
		const legacyPath = join(targetDir, legacyName);
		const managedPath = join(targetDir, entry.name);

		if (existsSync(legacyPath) && !existsSync(managedPath)) {
			renameSync(legacyPath, managedPath);
			console.log(`[@jjlmoya/prompagate] migrated skill asset ${managedPath}`);
		}
	}
}

function copyVitestTree(sourceDir, targetDir, label) {
	if (!existsSync(sourceDir)) return;
	mkdirSync(targetDir, { recursive: true });

	for (const entry of readdirSync(sourceDir, { withFileTypes: true })) {
		const source = join(sourceDir, entry.name);
		if (entry.isDirectory()) {
			copyVitestTree(source, join(targetDir, entry.name), label);
			continue;
		}

		const targetName = entry.name.endsWith(".template")
			? entry.name.slice(0, -".template".length)
			: entry.name;
		const target = join(targetDir, targetName);

		if (!existsSync(target)) {
			copyFileSync(source, target);
			console.log(`[@jjlmoya/prompagate] copied ${label}/${targetName}`);
		}
	}
}

copyTree(
	join(packageRoot, "prompts"),
	join(targetRoot, "prompts"),
	"prompts",
);

const vitestSource = join(packageRoot, "skills", "gamebob-tool-qa", "assets", "vitest");
const vitestSkillTarget = join(targetRoot, ".agents", "skills", "gamebob-tool-qa", "assets", "vitest");
migrateVitestTemplates(vitestSource, vitestSkillTarget);

copyTree(
	join(packageRoot, "skills", "gamebob-tool-qa"),
	join(targetRoot, ".agents", "skills", "gamebob-tool-qa"),
	"skill/gamebob-tool-qa",
);

copyVitestTree(
	vitestSource,
	join(targetRoot, "src", "tests"),
	"tests",
);

const createToolSource = join(packageRoot, "skills", "create-tool");
const createToolTargets = [
	".agents/skills/create-tool",
	".opencode/skills/create-tool",
	".claude/skills/create-tool",
	".gemini/skills/create-tool",
	".agent/skills/create-tool",
];

for (const target of createToolTargets) {
	copyTree(
		createToolSource,
		join(targetRoot, target),
		`skill/create-tool/${target}`,
		true,
	);
}
