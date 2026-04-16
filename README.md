# Trinade AI Technologies — Corporate Website

**Live**: https://trinade-v2.vercel.app

Built with Next.js 15 (App Router), Tailwind CSS v4, Motion v12, and GSAP. TypeScript strict mode.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3006
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

> On Windows, do **not** use `--turbopack` — it fails with a `nul` path error in PostCSS. The standard `next dev` on port 3006 is what the scripts invoke.

## Structure

```
app/         Next.js App Router — every route, layout, and metadata
components/  All UI components (flat)
public/      Static assets — images, favicons, fonts
Images/      Source images for blog content (non-runtime)
```
