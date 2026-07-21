"""Build the GitHub Pages site in docs/ without changing report content."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import re


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "content"
OUTPUT_DIR = ROOT / "docs"
TEMPLATE_PATH = ROOT / "templates" / "static_page.html"

PAGES = (
    ("index.html", "synthetic.html", "synthetic", "Synthetic Sport Datasets"),
    ("synthetic.html", "synthetic.html", "synthetic", "Synthetic Sport Datasets"),
    ("real.html", "real.html", "real", "Real Sport Datasets"),
    ("summary.html", "summary.html", "summary", "Summary"),
    ("report.html", "report.html", "report", "Report"),
    ("framework.html", "framework.html", "framework", "Framework"),
    ("data.html", "data.html", "data", "Data"),
)

NAV_ITEMS = (
    ("synthetic", "Synthetic", "synthetic.html"),
    ("real", "Real", "real.html"),
    ("summary", "Summary", "summary.html"),
    ("report", "Report", "report.html"),
    ("framework", "Framework", "framework.html"),
    ("data", "Data", "data.html"),
)

GOOGLE_TAG = """<!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8DT9W0F6P3"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-8DT9W0F6P3');
  </script>"""

COMMON_HEAD = """<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style/format.css?v=3">"""


def navigation(active_page: str) -> str:
    links = []
    for key, label, href in NAV_ITEMS:
        active = key == active_page
        class_name = ' class="site-active"' if active else ""
        current = ' aria-current="page"' if active else ""
        links.append(f'    <a href="{href}"{class_name}{current}>{label}</a>')

    return "\n".join(
        (
            '  <nav class="site-navbar" aria-label="Main navigation">',
            '    <a href="./" class="site-nav-home" aria-label="CDS home">',
            '      <img src="style/qut.png?v=1" class="site-nav-logo"',
            '           alt="Queensland University of Technology" width="70" height="70"',
            '           decoding="async">',
            '    </a>',
            '    <div class="site-nav-spacer"></div>',
            *links,
            "  </nav>",
        )
    )


def build_report_document(source: str, active_page: str) -> str:
    """Insert static site chrome while preserving the generated document."""
    head_match = re.search(r"<head(?:\s[^>]*)?>", source, flags=re.IGNORECASE)
    body_match = re.search(r"<body(?:\s[^>]*)?>", source, flags=re.IGNORECASE)
    if not head_match or not body_match:
        raise ValueError("Generated report must contain both <head> and <body> tags")

    source = source[: head_match.end()] + "\n" + GOOGLE_TAG + "\n  " + COMMON_HEAD + source[head_match.end() :]
    body_match = re.search(r"<body(?:\s[^>]*)?>", source, flags=re.IGNORECASE)
    assert body_match is not None
    return source[: body_match.end()] + "\n" + navigation(active_page) + source[body_match.end() :]


def build_framework_document(source: str, title: str, active_page: str) -> str:
    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    replacements = {
        "{{TITLE}}": title,
        "{{GOOGLE_TAG}}": GOOGLE_TAG,
        "{{COMMON_HEAD}}": COMMON_HEAD,
        "{{NAVIGATION}}": navigation(active_page),
        "{{CONTENT}}": source,
    }
    for marker, value in replacements.items():
        template = template.replace(marker, value)
    return template


class AssetCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.references: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag not in {"img", "link", "script"}:
            return
        values = dict(attrs)
        attribute = "href" if tag == "link" else "src"
        if values.get(attribute):
            self.references.append(values[attribute] or "")


def validate_output(output_files: list[Path]) -> None:
    missing: list[str] = []
    for output_file in output_files:
        collector = AssetCollector()
        text = output_file.read_text(encoding="utf-8")
        collector.feed(text)
        if "url_for(" in text:
            missing.append(f"{output_file.name}: contains a Flask URL")

        for reference in collector.references:
            parsed = urlsplit(reference)
            if parsed.scheme or parsed.netloc or reference.startswith(("data:", "#")):
                continue
            target = (output_file.parent / parsed.path).resolve()
            if not target.is_file():
                missing.append(f"{output_file.name}: missing {reference}")

    if missing:
        raise FileNotFoundError("\n".join(missing))


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_files: list[Path] = []

    for output_name, source_name, active_page, title in PAGES:
        source = (SOURCE_DIR / source_name).read_text(encoding="utf-8")
        if source_name == "framework.html":
            output = build_framework_document(source, title, active_page)
        else:
            output = build_report_document(source, active_page)

        output_path = OUTPUT_DIR / output_name
        output_path.write_text(output, encoding="utf-8", newline="")
        output_files.append(output_path)

    (OUTPUT_DIR / ".nojekyll").touch()
    validate_output(output_files)
    print(f"Built and validated {len(output_files)} static pages in {OUTPUT_DIR.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
