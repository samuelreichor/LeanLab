<script setup lang="ts">
type CategorySlug = 'meal-prep' | 'muskel-aufbau' | 'abnehmen' | 'vegetarisch'

interface Props {
  category: CategorySlug
  title: string
  description: string
  icon: string
  seo: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    ogImage: string
    ogUrl: string
  }
}

const props = defineProps<Props>()

const { data: recipes } = await useAsyncData(`${props.category}-recipes`, () =>
  queryCollection('recipes').all()
)

const sortBy = ref('newest')

const sortOptions = [
  { value: 'newest', label: 'Neuste' },
  { value: 'oldest', label: 'Älteste' },
  { value: 'prep-asc', label: 'Zeit (aufsteigend)' },
  { value: 'prep-desc', label: 'Zeit (absteigend)' },
  { value: 'protein-desc', label: 'Protein (höchste)' },
  { value: 'protein-asc', label: 'Protein (niedrigste)' },
  { value: 'kcal-asc', label: 'Kalorien (niedrigste)' },
  { value: 'kcal-desc', label: 'Kalorien (höchste)' }
]

const filteredRecipes = computed(() => {
  if (!recipes.value) return []

  let result = recipes.value.filter(recipe =>
    recipe.category?.includes(props.category)
  )

  result = [...result].sort((a, b) => {
    switch (sortBy.value) {
      case 'prep-asc':
        return (a.prepTime ?? 0) - (b.prepTime ?? 0)
      case 'prep-desc':
        return (b.prepTime ?? 0) - (a.prepTime ?? 0)
      case 'protein-desc':
        return (b.macros?.protein ?? 0) - (a.macros?.protein ?? 0)
      case 'protein-asc':
        return (a.macros?.protein ?? 0) - (b.macros?.protein ?? 0)
      case 'kcal-asc':
        return (a.macros?.kcal ?? 0) - (b.macros?.kcal ?? 0)
      case 'kcal-desc':
        return (b.macros?.kcal ?? 0) - (a.macros?.kcal ?? 0)
      default:
        return 0
    }
  })

  return result
})

// SEO Meta Tags
useSeoMeta({
  title: props.seo.title,
  description: props.seo.description,
  ogTitle: props.seo.ogTitle,
  ogDescription: props.seo.ogDescription,
  ogImage: props.seo.ogImage,
  ogUrl: props.seo.ogUrl,
  twitterCard: 'summary_large_image'
})

// JSON-LD Structured Data
const jsonLd = computed(() => {
  const recipeItems = filteredRecipes.value.map((recipe, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'item': {
      '@type': 'Recipe',
      'name': recipe.title,
      'description': recipe.description,
      'image': `https://leanlab.de${recipe.image}`,
      'url': `https://leanlab.de${recipe.path}`
    }
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': props.title,
    'description': props.description,
    'url': props.seo.ogUrl,
    'mainEntity': {
      '@type': 'ItemList',
      'name': props.title,
      'numberOfItems': recipeItems.length,
      'itemListElement': recipeItems
    }
  }
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(jsonLd.value))
    }
  ]
})
</script>

<template>
  <UContainer class="py-8 md:py-12">
    <!-- Hero -->
    <div class="mb-10">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
          <UIcon
            :name="icon"
            class="w-6 h-6 text-white"
          />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold">
          {{ title }}
        </h1>
      </div>
      <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
        {{ description }}
      </p>

      <UButton
        to="/r"
        size="xl"
        color="primary"
        trailing-icon="i-lucide-arrow-right"
        class="mt-6"
      >
        Alle Rezepte entdecken
      </UButton>
    </div>

    <!-- Sort -->
    <div class="flex items-center justify-between mb-6 sticky top-0 bg-white dark:bg-neutral-950 py-4 -mx-4 px-4 z-10">
      <p class="text-sm text-neutral-500">
        {{ filteredRecipes.length }} Rezepte
      </p>
      <USelect
        v-model="sortBy"
        :items="sortOptions"
        size="xl"
        class="w-48"
        aria-label="Rezepte sortieren nach"
      />
    </div>

    <!-- Recipe Grid -->
    <div
      v-if="filteredRecipes.length === 0"
      class="text-center py-12"
    >
      <UIcon
        name="i-lucide-search-x"
        class="w-12 h-12 text-neutral-400 mx-auto mb-4"
      />
      <p class="text-neutral-600 dark:text-neutral-400">
        Keine Rezepte gefunden.
      </p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.path"
        :recipe="recipe"
      />
    </div>
  </UContainer>
</template>
