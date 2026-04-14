import { existsSync, mkdirSync, readdirSync, copyFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const targetRoot = process.env.INIT_CWD;

if (!targetRoot || targetRoot === packageRoot) {
	process.exit(0);
}

const sourceDir = join(packageRoot, "prompts", "i18n");
const targetDir = join(targetRoot, "prompts", "i18n");

if (!existsSync(targetDir)) {
	mkdirSync(targetDir, { recursive: true });
}

const files = readdirSync(sourceDir);

for (const file of files) {
	const targetFile = join(targetDir, file);
	if (!existsSync(targetFile)) {
		copyFileSync(join(sourceDir, file), targetFile);
	}
}
