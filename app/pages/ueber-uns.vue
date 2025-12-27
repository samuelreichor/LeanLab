<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: 'Über uns - Das Team hinter LeanLab',
  description: 'Lerne das Team hinter LeanLab kennen. Wir sind Fitness-Enthusiasten und Ernährungsexperten, die einfache High-Protein Rezepte für deine Fitnessziele entwickeln.',
  ogTitle: 'Über uns | LeanLab',
  ogDescription: 'Das Team hinter LeanLab - Fitness-Enthusiasten und Ernährungsexperten.',
  ogImage: '/og-ueber-uns.png',
  ogUrl: 'https://leanlab.de/ueber-uns',
  twitterCard: 'summary_large_image'
})

// JSON-LD Structured Data for Organization & Authors
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://leanlab.de/#organization',
      'name': 'LeanLab',
      'url': 'https://leanlab.de',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://leanlab.de/logo.png'
      },
      'description': 'LeanLab ist deine Plattform für einfache High-Protein Rezepte. Optimiert für Muskelaufbau, Abnehmen und Meal Prep.',
      'foundingDate': '2024',
      'sameAs': [
        'https://instagram.com/leanlab.de'
      ]
    },
    {
      '@type': 'WebPage',
      '@id': 'https://leanlab.de/ueber-uns',
      'url': 'https://leanlab.de/ueber-uns',
      'name': 'Über uns - Das Team hinter LeanLab',
      'isPartOf': {
        '@id': 'https://leanlab.de/#website'
      },
      'about': {
        '@id': 'https://leanlab.de/#organization'
      },
      'description': 'Lerne das Team hinter LeanLab kennen.'
    }
  ]
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd)
    }
  ]
})

const values = [
  {
    icon: 'i-lucide-flask-conical',
    title: 'Wissenschaftlich fundiert',
    description: 'Alle Rezepte basieren auf aktuellen Ernährungswissenschaften und werden mit präzisen Makronährstoffen berechnet.'
  },
  {
    icon: 'i-lucide-clock',
    title: 'Alltagstauglich',
    description: 'Unsere Rezepte sind einfach und schnell zuzubereiten – perfekt für den stressigen Alltag.'
  },
  {
    icon: 'i-lucide-heart',
    title: 'Mit Leidenschaft',
    description: 'Jedes Rezept wird von uns selbst entwickelt, getestet und fotografiert.'
  },
  {
    icon: 'i-lucide-users',
    title: 'Community-driven',
    description: 'Wir hören auf euer Feedback und entwickeln Rezepte, die ihr euch wünscht.'
  }
]
</script>

<template>
  <UContainer class="pt-12 md:pt-20">
    <!-- Hero Section -->
    <div class="mb-12">
      <h1 class="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-6">
        Wir sind
        <span class="text-primary relative underline decoration-wavy decoration-pink-200 underline-offset-8 decoration-4">
          Lean Lab
        </span>
      </h1>
      <p class="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
        Eine Plattform von Fitness-Enthusiasten für alle, die sich gesund ernähren möchten – ohne dabei auf Geschmack zu verzichten.
      </p>
    </div>

    <!-- Mission Section -->
    <div class="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-8 md:p-12 mb-12">
      <div>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <UIcon
              name="i-lucide-target"
              class="w-6 h-6 text-white"
            />
          </div>
          <h2 class="text-2xl md:text-3xl font-bold">
            Unsere Mission
          </h2>
        </div>
        <p class="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
          Wir glauben, dass gesunde Ernährung nicht kompliziert sein muss. Deshalb entwickeln wir Rezepte, die proteinreich, lecker und einfach zuzubereiten sind.
        </p>
        <p class="text-lg text-neutral-600 dark:text-neutral-400">
          Ob du Muskeln aufbauen, abnehmen oder einfach bewusster essen möchtest – bei LeanLab findest du Rezepte, die zu deinen Zielen passen. Mit präzise berechneten Makros und klaren Anleitungen.
        </p>
      </div>
    </div>

    <!-- Values Grid -->
    <div class="mb-12">
      <h2 class="text-2xl md:text-3xl font-bold mb-8">
        Wofür wir stehen
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="value in values"
          :key="value.title"
          class="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800"
        >
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <UIcon
              :name="value.icon"
              class="w-6 h-6 text-primary"
            />
          </div>
          <h3 class="text-lg font-semibold mb-2">
            {{ value.title }}
          </h3>
          <p class="text-neutral-600 dark:text-neutral-400">
            {{ value.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Trust Section -->
    <div class="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-8 md:p-12 mb-12">
      <h2 class="text-2xl md:text-3xl font-bold mb-8">
        Warum du uns vertrauen kannst
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="text-4xl font-bold text-primary mb-2">
            100%
          </div>
          <p class="text-neutral-600 dark:text-neutral-400">
            Selbst entwickelte & getestete Rezepte
          </p>
        </div>
        <div>
          <div class="text-4xl font-bold text-primary mb-2">
            Präzise
          </div>
          <p class="text-neutral-600 dark:text-neutral-400">
            Berechnete Makronährwerte pro Portion
          </p>
        </div>
        <div>
          <div class="text-4xl font-bold text-primary mb-2">
            Gratis
          </div>
          <p class="text-neutral-600 dark:text-neutral-400">
            Alle Rezepte kostenlos verfügbar
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div>
      <h2 class="text-2xl md:text-3xl font-bold mb-4">
        Fragen oder Feedback?
      </h2>
      <p class="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl">
        Wir freuen uns über jede Nachricht. Schreib uns gerne, wenn du Rezeptwünsche hast oder Verbesserungsvorschläge.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          to="mailto:hallo@leanlab.de"
          size="xl"
          color="primary"
          leading-icon="i-lucide-mail"
        >
          hallo@leanlab.de
        </UButton>
        <UButton
          to="https://instagram.com/leanlab.de"
          target="_blank"
          size="xl"
          variant="outline"
          color="neutral"
          leading-icon="i-simple-icons-instagram"
        >
          @leanlab.de
        </UButton>
      </div>
    </div>
  </UContainer>
</template>
