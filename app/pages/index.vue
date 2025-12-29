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
  ogTitle: 'LeanLab - High-Protein Rezepte für Fitness',
  ogDescription: 'Einfache Fitness-Rezepte mit berechneten Makros. Optimiert für Muskelaufbau und Abnehmen.',
  ogImage: '/og-image.png',
  ogUrl: 'https://leanlab.de',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'LeanLab - High-Protein Rezepte',
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
      'image': `https://leanlab.de${recipe.image}`,
      'url': `https://leanlab.de${recipe.path}`
    }
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://leanlab.de/#website',
        'name': 'LeanLab',
        'url': 'https://leanlab.de',
        'description': 'High-Protein Rezepte für Fitness & Muskelaufbau',
        'inLanguage': 'de-DE'
      },
      {
        '@type': 'Organization',
        '@id': 'https://leanlab.de/#organization',
        'name': 'LeanLab',
        'url': 'https://leanlab.de',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://leanlab.de/logo.png'
        }
      },
      {
        '@type': 'ItemList',
        'name': 'Featured Rezepte',
        'description': 'Die proteinreichsten Rezepte bei LeanLab',
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
  </div>
</template>
