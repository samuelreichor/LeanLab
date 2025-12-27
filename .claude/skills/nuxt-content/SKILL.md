---
name: nuxt-content
description: Build content-driven Nuxt applications with git-based CMS. Use when creating blogs, documentation sites, portfolios, or any content-heavy website. Triggers on requests involving: Markdown content, MDC syntax, content collections, blog posts, documentation, YAML/JSON data files, content querying, or when user mentions "Nuxt Content".
---

# Nuxt Content Development

Nuxt Content is a git-based CMS for Nuxt that lets you write content in Markdown, YAML, JSON or CSV and query it in your application.

## Quick Reference

**Documentation:** https://content.nuxt.com
**Full Docs (for LLM):** https://content.nuxt.com/llms-full.txt

## Installation
```bash
npx nuxi module add content
```

## Core Concepts

1. **Collections**: Define content types with schemas
2. **MDC Syntax**: Use Vue components in Markdown
3. **Query API**: Fetch and filter content
4. **Type-safe**: Full TypeScript support with Zod validation

## Project Structure
```
content/
├── blog/
│   ├── first-post.md
│   └── second-post.md
├── docs/
│   ├── getting-started.md
│   └── configuration.md
└── data.yml
```

## Defining Collections

Create `content.config.ts` in project root:
```ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string()
      })
    }),
    data: defineCollection({
      type: 'data',
      source: '*.yml',
      schema: z.object({
        name: z.string(),
        items: z.array(z.string())
      })
    })
  }
})
```

## Collection Types

| Type | Use Case | Rendering |
|------|----------|-----------|
| `page` | Markdown content with body | Use `<ContentRenderer>` |
| `data` | YAML/JSON/CSV structured data | Access directly as objects |

## File Formats

### Markdown (.md)
```md
---
title: My Post
date: 2025-01-15
tags: [nuxt, vue]
---

# Introduction

Content here with **MDC syntax**.

::MyComponent{prop="value"}
Slot content
::
```

### YAML (.yml)
```yaml
name: Site Config
items:
  - Item 1
  - Item 2
```

### JSON (.json)
```json
{
  "name": "Data",
  "items": ["a", "b", "c"]
}
```

## Query API

### queryCollection
```ts
// Get all posts
const posts = await queryCollection('blog').all()

// Get single post by path
const post = await queryCollection('blog')
  .path('/blog/first-post')
  .first()

// Filter and sort
const recentPosts = await queryCollection('blog')
  .where('date', '>', new Date('2025-01-01'))
  .order('date', 'DESC')
  .limit(5)
  .all()

// Select specific fields
const titles = await queryCollection('blog')
  .select('title', 'date')
  .all()
```

### Query Methods

| Method | Description |
|--------|-------------|
| `.all()` | Get all matching items |
| `.first()` | Get first matching item |
| `.path(path)` | Filter by content path |
| `.where(field, op, value)` | Filter by field |
| `.order(field, direction)` | Sort results |
| `.limit(n)` | Limit results |
| `.skip(n)` | Skip results |
| `.select(...fields)` | Select specific fields |

### Navigation Query
```ts
// Generate navigation tree
const navigation = await queryCollectionNavigation('docs')

// Get surrounding pages (prev/next)
const { prev, next } = await queryCollectionItemSurroundings(
  'docs',
  '/docs/getting-started'
)
```

## Rendering Content

### ContentRenderer Component
```vue
<script setup>
const post = await queryCollection('blog')
  .path('/blog/first-post')
  .first()
</script>

<template>
  <article>
    <h1>{{ post.title }}</h1>
    <ContentRenderer :value="post" />
  </article>
</template>
```

### Dynamic Routes
```vue
<!-- pages/blog/[...slug].vue -->
<script setup>
const route = useRoute()
const post = await queryCollection('blog')
  .path(route.path)
  .first()

if (!post) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}
</script>

<template>
  <article>
    <h1>{{ post.title }}</h1>
    <time>{{ post.date }}</time>
    <ContentRenderer :value="post" />
  </article>
</template>
```

## MDC Syntax (Markdown Components)

### Block Components
```md
::Alert{type="warning"}
This is a warning message.
::

::Card
  ::CardHeader
  Title here
  ::
  ::CardBody
  Content here
  ::
::
```

### Inline Components
```md
This is :badge[New]{color="green"} inline component.
```

### Props and Slots
```md
::Hero{title="Welcome" background="/hero.jpg"}
#description
This is the description slot.

#actions
- [Get Started](/docs)
- [Learn More](/about)
::
```

## Prose Components

Override default Markdown rendering:
```vue
<!-- components/content/ProseH1.vue -->
<template>
  <h1 class="text-4xl font-bold text-primary">
    <slot />
  </h1>
</template>
```

Available prose components:
`ProseA`, `ProseBlockquote`, `ProseCode`, `ProseEm`, `ProseH1`-`ProseH6`, `ProseHr`, `ProseImg`, `ProseLi`, `ProseOl`, `ProseP`, `ProsePre`, `ProseStrong`, `ProseTable`, `ProseTbody`, `ProseTd`, `ProseTh`, `ProseThead`, `ProseTr`, `ProseUl`

## Common Patterns

### Blog List Page
```vue
<!-- pages/blog/index.vue -->
<script setup>
const posts = await queryCollection('blog')
  .order('date', 'DESC')
  .all()
</script>

<template>
  <div>
    <h1>Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post._path">
        <NuxtLink :to="post._path">
          <h2>{{ post.title }}</h2>
          <p>{{ post.description }}</p>
          <time>{{ post.date }}</time>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
```

### Documentation with Navigation
```vue
<!-- layouts/docs.vue -->
<script setup>
const navigation = await queryCollectionNavigation('docs')
</script>

<template>
  <div class="flex">
    <aside>
      <nav>
        <ul>
          <li v-for="item in navigation" :key="item._path">
            <NuxtLink :to="item._path">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
    <main>
      <slot />
    </main>
  </div>
</template>
```

### Prev/Next Navigation
```vue
<script setup>
const route = useRoute()
const { prev, next } = await queryCollectionItemSurroundings(
  'docs',
  route.path
)
</script>

<template>
  <nav class="flex justify-between">
    <NuxtLink v-if="prev" :to="prev._path">
      ← {{ prev.title }}
    </NuxtLink>
    <NuxtLink v-if="next" :to="next._path">
      {{ next.title }} →
    </NuxtLink>
  </nav>
</template>
```

## Deployment

| Platform | Command/Config |
|----------|----------------|
| Static (SSG) | `nuxt generate` |
| Node Server | `nuxt build` |
| Vercel | Zero config |
| Netlify | Zero config |
| Cloudflare Pages | `NITRO_PRESET=cloudflare_pages` |
| NuxtHub | `npx nuxthub deploy` |

## Nuxt UI Integration

Nuxt Content works seamlessly with Nuxt UI components:
```md
::UAlert{color="primary" title="Note"}
This uses Nuxt UI's Alert component.
::

::UCard
Content inside a Nuxt UI Card.
::
```

## Best Practices

1. **Define schemas** - Always use Zod schemas for type safety
2. **Use collections** - Group related content logically
3. **MDC for interactivity** - Embed Vue components in Markdown
4. **Static generation** - Use `nuxt generate` for best performance
5. **Prose overrides** - Customize Markdown rendering via prose components
6. **Path-based routing** - Use `[...slug].vue` for content pages
