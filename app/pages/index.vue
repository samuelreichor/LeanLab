<script setup lang="ts">
// Fetch featured recipes (sorted by protein, top 6)
// Using order and limit to reduce data transfer
const { data: recipes } = await useAsyncData('featured-recipes', () =>
  queryCollection('recipes')
    .order('macros.protein', 'DESC')
    .limit(6)
    .all()
)

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
    <HomeFeatured :recipes="recipes ?? []" />
    <LazyHomeCategories />
    <LazyNewsletterSection />
    <LazyHomeBenefits />
    <LazyHomeFaq />
  </div>
</template>
