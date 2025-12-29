<script setup lang="ts">
// Search data for recipes
const { data: searchFiles } = useLazyAsyncData('search', () => queryCollectionSearchSections('recipes'), {
  server: false
})
const { data: rawNavigation } = await useAsyncData('navigation', () => queryCollectionNavigation('recipes'))

// Transform navigation to show "Rezepte" instead of "r"
const navigation = computed(() => {
  if (!rawNavigation.value) return []
  return rawNavigation.value.map(item => ({
    ...item,
    title: item.title === 'R' || item.title === 'r' ? 'Rezepte' : item.title
  }))
})

// Quick links for search
const searchLinks = [
  {
    label: 'Alle Rezepte',
    icon: 'i-lucide-book-open',
    to: '/r'
  },
  {
    label: 'Meal Prep',
    icon: 'i-lucide-calendar',
    to: '/r/meal-prep'
  },
  {
    label: 'Muskelaufbau',
    icon: 'i-lucide-dumbbell',
    to: '/r/muskel-aufbau'
  },
  {
    label: 'Abnehmen',
    icon: 'i-lucide-scale',
    to: '/r/abnehmen'
  },
  {
    label: 'Vegetarisch',
    icon: 'i-lucide-leaf',
    to: '/r/vegetarisch'
  }
]

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'de'
  }
})

useSeoMeta({
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/landing-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/landing-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <AppHeader />

    <main id="main-content">
      <NuxtPage />
    </main>

    <AppFooter />

    <ClientOnly>
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
