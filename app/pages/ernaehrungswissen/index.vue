<script setup lang="ts">
useSeoMeta({
  title: 'Ernährungswissen - Grundlagen für deine Fitnessziele',
  description: 'Lerne alles über High Protein Ernährung, Makros berechnen, Abnehmen und Meal Prep. Wissenschaftlich fundiertes Wissen für deine Fitness.',
  ogTitle: 'Ernährungswissen | Fit Kitchen',
  ogDescription: 'Grundlagen für deine Fitnessziele - High Protein, Makros & mehr.',
  ogUrl: 'https://fit-kitchen.at/ernaehrungswissen'
})

const articles = [
  {
    title: 'Was ist High Protein?',
    description: 'Erfahre, warum Protein so wichtig ist und wie viel du täglich brauchst.',
    icon: 'i-lucide-beef',
    to: '/ernaehrungswissen/was-ist-high-protein'
  },
  {
    title: 'Makros berechnen',
    description: 'Lerne, wie du deine Makronährstoffe für deine Ziele berechnest.',
    icon: 'i-lucide-calculator',
    to: '/ernaehrungswissen/macros-berechnen'
  },
  {
    title: 'Abnehmen mit Makros',
    description: 'So nutzt du Makro-Tracking für eine erfolgreiche Gewichtsabnahme.',
    icon: 'i-lucide-trending-down',
    to: '/ernaehrungswissen/abnehmen-mit-macros'
  },
  {
    title: 'Meal Prep für Anfänger',
    description: 'Der komplette Guide zum Vorkochen für die ganze Woche.',
    icon: 'i-lucide-refrigerator',
    to: '/ernaehrungswissen/meal-prep-anfaenger'
  }
]
</script>

<template>
  <UContainer class="pt-6 md:pt-10">
    <!-- Hero -->
    <div>
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
          <UIcon
            name="i-lucide-book-open"
            class="w-6 h-6 text-white"
          />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold">
          Ernährungswissen
        </h1>
      </div>
      <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
        Fundiertes Wissen rund um Ernährung, Makros und Meal Prep – damit du deine Fitnessziele erreichst.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-10">
      <NuxtLink
        v-for="article in articles"
        :key="article.to"
        :to="article.to"
        class="group"
      >
        <div class="bg-white dark:bg-neutral-900 rounded-2xl p-6 h-full border border-neutral-200 dark:border-neutral-800 transition-all hover:-translate-y-1">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <UIcon
              :name="article.icon"
              class="w-6 h-6 text-primary"
            />
          </div>
          <h2 class="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {{ article.title }}
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            {{ article.description }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </UContainer>
</template>
