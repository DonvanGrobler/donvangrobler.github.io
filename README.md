# donvangrobler.github.io

Personal website and blog for Donvan Grobler, built with Astro and deployed through GitHub Pages.

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

## Public-repository note

This repository is public. A post marked `draft: true` is excluded from the rendered website, but its Markdown source remains visible on GitHub. Drafts must therefore contain no confidential client, company, budget, contract or internal project information.
