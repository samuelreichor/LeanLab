# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install           # Install dependencies
npm run dev           # Start development server on http://localhost:3000
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run typecheck     # Run TypeScript type checking
```

## Architecture

This is a Nuxt 4 landing page application using:
- **Nuxt UI v4** (`@nuxt/ui`) for components and styling
- **Nuxt Content v3** (`@nuxt/content`) for content management
- **Nuxt Image** (`@nuxt/image`) for optimized images

### Directory Structure

- `app/` - Application code (Nuxt 4 app directory structure)
  - `app.vue` - Root component with AppHeader, NuxtPage, and AppFooter
  - `app.config.ts` - UI theme configuration (colors, component variants)
  - `pages/` - File-based routing
  - `components/` - Vue components
  - `assets/css/main.css` - Global styles
- `content/` - Content files (YAML) managed by Nuxt Content
- `content.config.ts` - Content collection schemas using Zod

### Content System

Content is defined in `content/index.yml` and validated against Zod schemas in `content.config.ts`. The schema defines sections: hero, section, features, steps, pricing, testimonials, and cta.

### ESLint Configuration

Configured in `nuxt.config.ts` with stylistic rules:
- `commaDangle: 'never'`
- `braceStyle: '1tbs'`
