# CDS Seed

Identify common data science and AI use cases in sports, and opportunities to
integrate synthetic data into day-to-day workflows.

The website is a fully static GitHub Pages site. It does not require Flask,
Gunicorn, Render, or another application server.

## GitHub Pages

Publish the `docs/` folder from the `main` branch. The site will be available at:

https://paulyrp.github.io/cds-seed/

## Preview locally

```powershell
python -m http.server 8000 --directory docs
```

Open http://127.0.0.1:8000/.

## Rebuild after changing report content

Source report documents are stored in `content/`. Run:

```powershell
python scripts/extract_shared_assets.py
python scripts/build_static_site.py
```

The first command extracts only large byte-identical CSS and JavaScript blocks
for cross-page caching. The second builds and validates the static pages in
`docs/`; report content and page-specific data are preserved.
