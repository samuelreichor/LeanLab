---
name: nuxt-ui
description: Build Vue/Nuxt applications with Nuxt UI component library. Use when creating web interfaces, dashboards, landing pages, forms, or any UI with Vue/Nuxt. Triggers on requests involving: Vue components, Nuxt pages, Tailwind styling, UI layouts, forms, modals, tables, navigation, or when user mentions "Nuxt UI".
---

# Nuxt UI Development

Nuxt UI is a comprehensive Vue component library with 125+ accessible, production-ready Tailwind CSS components.

## Quick Reference

**Documentation:** https://ui.nuxt.com
**Full Docs (for LLM):** https://ui.nuxt.com/llms-full.txt
**Figma Kit:** Available for design handoffs

## Core Principles

1. **Tailwind-first**: All styling via Tailwind utilities and CSS variables
2. **Accessible**: Built on Reka UI with WAI-ARIA compliance
3. **TypeScript**: Full type support and auto-completion
4. **Dark mode**: Built-in light/dark theming

## Component Selection Guide

### Layout & Structure
| Need | Component |
|------|-----------|
| Page wrapper | `App`, `Main`, `Container` |
| Dashboard layout | `DashboardGroup`, `DashboardSidebar`, `DashboardPanel` |
| Page sections | `Page`, `PageHeader`, `PageHero`, `PageSection` |
| Cards | `Card`, `PageCard` |

### Navigation
| Need | Component |
|------|-----------|
| Header | `Header`, `DashboardNavbar` |
| Sidebar | `DashboardSidebar`, `NavigationMenu` |
| Breadcrumbs | `Breadcrumb` |
| Tabs | `Tabs` |
| Footer | `Footer`, `FooterColumns` |

### Forms & Input
| Need | Component |
|------|-----------|
| Form wrapper | `Form`, `FormField` |
| Text input | `Input`, `Textarea` |
| Selection | `Select`, `SelectMenu`, `RadioGroup`, `Checkbox` |
| Date/Time | `InputDate`, `InputTime`, `Calendar` |
| File upload | `FileUpload` |
| Tags | `InputTags` |
| Color | `ColorPicker` |

### Data Display
| Need | Component |
|------|-----------|
| Tables | `Table` |
| Lists | `PageList`, `Timeline` |
| Grids | `PageGrid`, `PageColumns` |
| Blog posts | `BlogPost`, `BlogPosts` |
| User info | `User`, `Avatar`, `AvatarGroup` |

### Feedback & Overlays
| Need | Component |
|------|-----------|
| Modal | `Modal` |
| Drawer | `Drawer`, `Slideover` |
| Toast | `Toast` (via `useToast`) |
| Tooltip | `Tooltip`, `Popover` |
| Alert | `Alert`, `Banner` |
| Progress | `Progress`, `Skeleton` |

### Actions
| Need | Component |
|------|-----------|
| Buttons | `Button` |
| Dropdown | `DropdownMenu`, `ContextMenu` |
| Command palette | `CommandPalette`, `DashboardSearch` |

## Theming

### CSS Variables (app.css)
```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --color-primary-50: #f0fdf4;
  --color-primary-500: #22c55e;
  --color-primary-900: #14532d;
  
  --font-sans: 'Inter', sans-serif;
}
```

### Component Customization
Use the `ui` prop for component-level styling:
```vue
<UButton
  color="primary"
  variant="solid"
  :ui="{ rounded: 'rounded-full' }"
>
  Click me
</UButton>
```

## Common Patterns

### Page with Header
```vue
<template>
  <UApp>
    <UHeader>
      <template #logo>
        <span class="font-bold">MyApp</span>
      </template>
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>
    <UMain>
      <UContainer>
        <slot />
      </UContainer>
    </UMain>
  </UApp>
</template>
```

### Dashboard Layout
```vue
<template>
  <UDashboardGroup>
    <UDashboardSidebar>
      <UNavigationMenu :items="navItems" />
    </UDashboardSidebar>
    <UDashboardPanel>
      <slot />
    </UDashboardPanel>
  </UDashboardGroup>
</template>
```

### Form with Validation
```vue
<script setup>
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const state = reactive({ email: '', password: '' })

async function onSubmit() {
  // Handle submission
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>
    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>
    <UButton type="submit">Submit</UButton>
  </UForm>
</template>
```

## Key Composables

- `useToast()` - Display toast notifications
- `useOverlay()` - Programmatic modal/drawer control
- `defineShortcuts()` - Keyboard shortcuts
- `useFormField()` - Custom form input integration

## Best Practices

1. **Always wrap app** in `<UApp>` for global config and toasts
2. **Use semantic components** - `PageHero` for heroes, `Card` for cards
3. **Leverage built-in dark mode** - Use `UColorModeButton` or `UColorModeSwitch`
4. **Form validation** - Use Zod schemas with `UForm`
5. **Responsive** - Components are mobile-first by default
6. **Icons** - Use Iconify icons via `icon` prop: `icon="i-heroicons-home"`

## When NOT to Use Nuxt UI

- Material Design needed → Use Vuetify
- Ant Design style → Use ant-design-vue
- No Tailwind → Use PrimeVue or Element Plus
- Copy-paste components → Use shadcn-vue
- Headless only → Use Reka UI
