"""Extract large duplicated inline assets from generated report HTML files.

Run this after regenerating the report pages. The transformation only replaces
byte-identical script and style blocks; report text and page-specific data stay
in their original files.
"""

from __future__ import annotations

from collections import defaultdict
from hashlib import sha256
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "content"
OUTPUT_DIR = ROOT / "docs" / "style" / "report-shared"
REPORT_NAMES = ("data.html", "real.html", "report.html", "summary.html", "synthetic.html")
MINIMUM_SIZE = 100_000

BLOCK_PATTERN = re.compile(
    r"^[ \t]*<(?P<tag>script|style)(?P<attrs>[^>]*)>"
    r"(?P<body>.*?)</(?P=tag)>",
    re.MULTILINE | re.DOTALL,
)


def main() -> None:
    pages = {name: (SOURCE_DIR / name).read_text(encoding="utf-8") for name in REPORT_NAMES}
    occurrences: dict[tuple[str, str], list[tuple[str, re.Match[str]]]] = defaultdict(list)

    for name, text in pages.items():
        for match in BLOCK_PATTERN.finditer(text):
            body = match.group("body")
            if len(body) < MINIMUM_SIZE:
                continue
            digest = sha256(body.encode("utf-8")).hexdigest()[:16]
            occurrences[(match.group("tag"), digest)].append((name, match))

    shared = {key: matches for key, matches in occurrences.items() if len(matches) > 1}
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for (tag, digest), matches in shared.items():
        extension = "js" if tag == "script" else "css"
        asset_name = f"{digest}.{extension}"
        body = matches[0][1].group("body")
        (OUTPUT_DIR / asset_name).write_text(body, encoding="utf-8", newline="")

    for name, text in pages.items():
        replacements: list[tuple[int, int, str]] = []

        for (tag, digest), matches in shared.items():
            extension = "js" if tag == "script" else "css"
            asset_url = f"style/report-shared/{digest}.{extension}"

            for page_name, match in matches:
                if page_name != name:
                    continue

                attrs = match.group("attrs").strip()
                if tag == "script":
                    replacement = f'<script src="{asset_url}"'
                    replacement += f" {attrs}" if attrs else ""
                    replacement += "></script>"
                else:
                    replacement = f'<link rel="stylesheet" href="{asset_url}"'
                    replacement += f" {attrs}" if attrs else ""
                    replacement += ">"

                replacements.append((match.start(), match.end(), replacement))

        for start, end, replacement in sorted(replacements, reverse=True):
            text = text[:start] + replacement + text[end:]

        (SOURCE_DIR / name).write_text(text, encoding="utf-8", newline="")

    print(f"Extracted {len(shared)} shared assets to {OUTPUT_DIR.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
