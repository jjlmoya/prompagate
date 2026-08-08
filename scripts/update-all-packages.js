import {
	existsSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const packageJsonPath = join(packageRoot, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const dependencyName = "@jjlmoya/prompagate";
const version = getOption("--version") ?? packageJson.version;
const apply = process.argv.includes("--apply");
const root = getOption("--root") ?? join(packageRoot, "..");

if (!existsSync(root)) {
	throw new Error("Workspace root does not exist: " + root);
}

const candidates = readdirSync(root, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => join(root, entry.name))
	.filter((directory) => directory !== packageRoot)
	.map((directory) => ({
		directory,
		path: join(directory, "package.json"),
	}))
	.filter((candidate) => existsSync(candidate.path))
	.map((candidate) => ({
		...candidate,
		packageJson: JSON.parse(readFileSync(candidate.path, "utf8")),
	}))
	.filter((candidate) => hasDependency(candidate.packageJson, dependencyName));

if (candidates.length === 0) {
	console.log("[" + dependencyName + "] No dependent repositories found under " + root);
	process.exit(0);
}

console.log("[" + dependencyName + "] Target version: " + version);
console.log("[" + dependencyName + "] Mode: " + (apply ? "apply" : "dry-run"));

const failures = [];

for (const candidate of candidates) {
	const fields = dependencyFields(candidate.packageJson, dependencyName);
	const current = fields.map(({ field }) => field + ":" + candidate.packageJson[field][dependencyName]).join(", ");
	console.log(candidate.directory + ": " + current + " -> ^" + version);

	if (!apply) continue;

	try {
		for (const { field } of fields) {
			candidate.packageJson[field][dependencyName] = "^" + version;
		}

		const original = readFileSync(candidate.path, "utf8");
		const indentation = original.match(/^[\t ]+(?=")/m)?.[0] ?? "\t";
		const newline = original.includes("\r\n") ? "\r\n" : "\n";
		const next = JSON.stringify(candidate.packageJson, null, indentation) + newline;
		writeFileSync(candidate.path, next, "utf8");

		const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
		execFileSync(npmCommand, ["install", "--ignore-scripts=false"], {
			cwd: candidate.directory,
			stdio: "inherit",
			shell: process.platform === "win32",
		});
	} catch (error) {
		failures.push(candidate.directory);
		console.error("[" + dependencyName + "] Failed: " + candidate.directory);
		console.error(error instanceof Error ? error.message : String(error));
	}
}

if (!apply) {
	console.log("Dry-run only. Re-run with --apply to update dependencies and run each postinstall.");
}

if (failures.length > 0) {
	process.exitCode = 1;
	console.error("[" + dependencyName + "] Failed repositories: " + failures.join(", "));
}

function getOption(name) {
	const index = process.argv.indexOf(name);
	if (index === -1) return undefined;
	const value = process.argv[index + 1];
	if (!value || value.startsWith("--")) {
		throw new Error(name + " requires a value");
	}
	return value;
}

function dependencyFields(project, name) {
	return [
		"dependencies",
		"devDependencies",
		"optionalDependencies",
		"peerDependencies",
	]
		.filter((field) => project[field]?.[name])
		.map((field) => ({ field }));
}

function hasDependency(project, name) {
	return dependencyFields(project, name).length > 0;
}
