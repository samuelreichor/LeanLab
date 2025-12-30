<script setup lang="ts">
// Fetch featured recipes (sorted by protein, top 6)
const { data: recipes } = await useAsyncData('featured-recipes', () =>
  queryCollection('recipes').all()
)

const featuredRecipes = computed(() => {
  if (!recipes.value) return []
  return [...recipes.value]
    .sort((a, b) => (b.macros?.protein ?? 0) - (a.macros?.protein ?? 0))
    .slice(0, 6)
})

// SEO Meta Tags
useSeoMeta({
  title: 'High-Protein Rezepte für Fitness & Muskelaufbau',
  description: 'Entdecke einfache High-Protein Rezepte für Muskelaufbau, Abnehmen und Meal Prep. Schnell zubereitet, mit berechneten Makros für deine Fitnessziele.',
  ogTitle: 'Fit Kitchen - High-Protein Rezepte für Fitness',
  ogDescription: 'Einfache Fitness-Rezepte mit berechneten Makros. Optimiert für Muskelaufbau und Abnehmen.',
  ogUrl: 'https://fit-kitchen.at',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Fit Kitchen - High-Protein Rezepte',
  twitterDescription: 'Einfache Fitness-Rezepte mit berechneten Makros.'
})

// JSON-LD Structured Data
const jsonLd = computed(() => {
  const recipeItems = featuredRecipes.value.map((recipe, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'item': {
      '@type': 'Recipe',
      'name': recipe.title,
      'description': recipe.description,
      'image': `https://fit-kitchen.at${recipe.image}`,
      'url': `https://fit-kitchen.at${recipe.path}`
    }
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://fit-kitchen.at/#website',
        'name': 'Fit Kitchen',
        'url': 'https://fit-kitchen.at',
        'description': 'High-Protein Rezepte für Fitness & Muskelaufbau',
        'inLanguage': 'de-DE'
      },
      {
        '@type': 'Organization',
        '@id': 'https://fit-kitchen.at/#organization',
        'name': 'Fit Kitchen',
        'url': 'https://fit-kitchen.at',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://fit-kitchen.at/logo.png'
        }
      },
      {
        '@type': 'ItemList',
        'name': 'Featured Rezepte',
        'description': 'Die proteinreichsten Rezepte bei Fit Kitchen',
        'numberOfItems': recipeItems.length,
        'itemListElement': recipeItems
      }
    ]
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
  <div>
    <HomeHero :recipes="recipes ?? []" />
    <HomeFeatured :recipes="featuredRecipes" />
    <HomeCategories />
    <NewsletterSection />
    <HomeBenefits />
    <HomeFaq />
  </div>
</template>
