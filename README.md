# nekoguntai_html

Source for [nekoguntai.dev](https://nekoguntai.dev/), served by GitHub Pages from the `main` branch.

## Layout

```
.
├── CNAME              # nekoguntai.dev
├── .nojekyll          # disables Jekyll processing
└── sanctuary/         # marketing site for the Sanctuary project
```

The apex (`nekoguntai.dev/`) is reserved for a forthcoming landing page. Each
top-level subdirectory is a self-contained subsite — `sanctuary/` is the first.

## Deployment

1. Push to `main`.
2. GitHub Pages rebuilds from the repo root (see Settings → Pages).
3. DNS: `nekoguntai.dev` apex points at GitHub Pages IPs, and `www` CNAMEs to
   `nekoguntai.github.io`. Full details in
   [GitHub's custom-domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Editing a subsite

Each subsite's pages are plain HTML + Tailwind (loaded via CDN) + a small
`css/` + `js/` pair. No build step, no Node, no framework. Open any `.html`
file locally or serve the directory with `python3 -m http.server 8000`.
