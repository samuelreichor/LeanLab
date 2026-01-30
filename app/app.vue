<script setup lang="ts">
// Search data for recipes
const { data: searchFiles } = useLazyAsyncData('search', () => queryCollectionSearchSections('recipes'), {
  server: false
})
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('recipes'))

defineOgImageComponent('Default')

// Quick links for search
const searchLinks = [
  {
    label: 'Alle Rezepte',
    icon: 'i-lucide-book-open',
    to: '/rezepte'
  },
  {
    label: 'Meal Prep',
    icon: 'i-lucide-calendar',
    to: '/rezepte/meal-prep'
  },
  {
    label: 'Muskelaufbau',
    icon: 'i-lucide-dumbbell',
    to: '/rezepte/muskelaufbau'
  },
  {
    label: 'Abnehmen',
    icon: 'i-lucide-scale',
    to: '/rezepte/abnehmen'
  },
  {
    label: 'Vegetarisch',
    icon: 'i-lucide-leaf',
    to: '/rezepte/vegetarisch'
  }
]
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <AppHeader />

    <main id="main-content">
      <NuxtPage />
    </main>

    <AppFooter />

    <ClientOnly>
      <CookieBanner />
      <UContentSearch
        placeholder="Suche nach Rezepten..."
        :files="searchFiles"
        :navigation="navigation"
        :links="searchLinks"
        :fuse="{ resultLimit: 10 }"
      />
    </ClientOnly>
  </UApp>
</template>
