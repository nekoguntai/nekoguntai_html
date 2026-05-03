# nekoguntai_html

Source for [nekoguntai.dev](https://nekoguntai.dev/), served as a static site from the `main` branch.

## Layout

```
.
├── CNAME              # nekoguntai.dev
├── .nojekyll          # disables Jekyll processing
├── index.html         # apex landing page
├── css/, js/, assets/ # apex landing page's own styles, script, and marks
└── sanctuary/         # marketing site for the Sanctuary project
```

The apex (`nekoguntai.dev/`) is the landing page — it introduces the project
family and links out to each subsite. Each top-level subdirectory is a
self-contained subsite; `sanctuary/` is the first.

## Deployment

1. Push to `main`.
2. Rebuild or publish the repo root with the configured static-site host.
3. DNS: `nekoguntai.dev` apex and `www` should point at the active host.

## Editing the apex or a subsite

Both the apex landing page and each subsite follow the same rules: plain HTML
+ Tailwind (loaded via CDN) + a small `css/` + `js/` pair. No build step, no
Node, no framework. Open any `.html` file locally or serve the repo root with
`python3 -m http.server 8000`.

To add a new project card to the apex, duplicate the `PROJECT CARD PATTERN`
`<article>` block in `index.html` and follow the inline comment.
