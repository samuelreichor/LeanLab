<script setup lang="ts">
// Fetch all recipes with only needed fields for stats and featured section
const { data: recipes } = await useAsyncData('featured-recipes', () =>
  queryCollection('recipes')
    .select('path', 'title', 'description', 'image', 'category', 'prepTime', 'macros')
    .all()
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

// Schema.org Structured Data
useSchemaOrg([
  defineWebSite({
    name: 'Fit Kitchen',
    description: 'High-Protein Rezepte für Fitness & Muskelaufbau',
    inLanguage: 'de-DE'
  }),
  defineWebPage({
    name: 'High-Protein Rezepte für Fitness & Muskelaufbau',
    description: 'Entdecke einfache High-Protein Rezepte für Muskelaufbau, Abnehmen und Meal Prep.'
  })
])
</script>

<template>
  <div>
    <HomeHero :recipes="recipes ?? []" />
    <HomeFeatured :recipes="featuredRecipes" />
    <LazyHomeCategories />
    <LazyNewsletterSection />
    <LazyHomeBenefits />
    <LazyHomeFaq />
  </div>
</template>
