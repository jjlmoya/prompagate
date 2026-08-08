#!/usr/bin/env python3
"""Install the reusable GameBob Vitest QA guards into one compatible repo."""

from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path


TEMPLATE_FILES = (
    "qa-test-helpers.ts",
    "qa_runtime_i18n.test.ts",
    "qa_logic_reference_coverage.test.ts",
    "qa_claim_evidence.test.ts",
    "qa_bibliography_links.test.ts",
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("repo", type=Path, help="Path to one jjlmoya-utils-* repository")
    parser.add_argument("--dry-run", action="store_true", help="Show planned changes without writing")
    parser.add_argument("--force", action="store_true", help="Overwrite different QA files")
    return parser.parse_args()


def validate_repo(repo: Path) -> list[str]:
    errors: list[str] = []
    required = ("package.json", "src/tool", "src/tests", "src/tools.ts")
    for item in required:
        if not (repo / item).exists():
            errors.append(f"missing {item}")
    if not repo.name.startswith("jjlmoya-utils-"):
        errors.append("directory name must start with jjlmoya-utils-")
    return errors


def main() -> int:
    args = parse_args()
    repo = args.repo.expanduser().resolve()
    errors = validate_repo(repo)
    if errors:
        print(f"Incompatible repository: {repo}", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 2

    template_dir = Path(__file__).resolve().parent.parent / "assets" / "vitest"
    target_dir = repo / "src" / "tests"
    changed = 0
    skipped = 0

    for filename in TEMPLATE_FILES:
        source = template_dir / filename
        target = target_dir / filename
        if not source.exists():
            print(f"Missing skill asset: {source}", file=sys.stderr)
            return 3

        if target.exists() and target.read_bytes() == source.read_bytes():
            print(f"UNCHANGED {target}")
            continue
        if target.exists() and not args.force:
            print(f"SKIPPED   {target} (different file; inspect or use --force)")
            skipped += 1
            continue

        action = "WOULD WRITE" if args.dry_run else "WROTE"
        print(f"{action:<11}{target}")
        changed += 1
        if not args.dry_run:
            shutil.copy2(source, target)

    print(f"Summary: {changed} change(s), {skipped} conflict(s), dry_run={args.dry_run}")
    return 1 if skipped else 0


if __name__ == "__main__":
    raise SystemExit(main())

