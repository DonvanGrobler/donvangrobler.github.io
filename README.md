# donvangrobler.github.io

Personal website and blog for Donvan Grobler, built with Astro and deployed free through GitHub Pages.

## First deployment

1. Create a **public** GitHub repository named exactly `donvangrobler.github.io` under the `DonvanGrobler` account.
2. Upload or push all files in this project to the repository's `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Open the **Actions** tab and confirm that “Deploy to GitHub Pages” completes successfully.
6. The site will be available at `https://donvangrobler.github.io`.

## Local development

```bash
npm install
npm run dev
```

Build the production version with:

```bash
npm run build
```

## Publishing a blog post

1. Add a Markdown file to `src/content/blog/`, for example `my-new-post.md`.
2. Copy this front matter:

```yaml
---
title: "Post title"
description: "One or two sentences used in article cards and search results."
publishedDate: 2026-07-30
tags:
  - Earth observation
  - Product thinking
featured: false
draft: true
---
```

3. Write the article below the front matter.
4. Change `draft: true` to `draft: false` when ready to publish.
5. Commit and push to `main`. GitHub Actions will rebuild the site automatically.

## Personalisation checklist

- Review the text on Home, About and Projects.
- Add a LinkedIn link when ready.
- Add a CV PDF to `public/` and link it from the About page.
- Replace or expand the sample welcome post.
- Complete the private terrAIntel-to-terrAInnovate draft.
