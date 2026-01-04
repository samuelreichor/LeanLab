<script setup lang="ts">
useSeoMeta({
  title: 'Makros berechnen - So ermittelst du deine optimalen Makronährstoffe',
  description: 'Lerne, wie du deine Makros (Protein, Kohlenhydrate, Fett) für Muskelaufbau oder Abnehmen berechnest. Mit einfacher Schritt-für-Schritt Anleitung.',
  ogTitle: 'Makros berechnen | Fit Kitchen',
  ogDescription: 'So ermittelst du deine optimalen Makronährstoffe für deine Fitnessziele.',
  ogUrl: 'https://fit-kitchen.at/ernaehrungswissen/macros-berechnen'
})

// Schema.org
useSchemaOrg([
  defineArticle({
    headline: 'Makros berechnen - So ermittelst du deine optimalen Makronährstoffe',
    description: 'Lerne, wie du deine Makros für Muskelaufbau oder Abnehmen berechnest.',
    author: {
      name: 'Samuel Reichör',
      url: 'https://fit-kitchen.at/ueber-uns'
    }
  })
])

// Fetch sample recipes with macros
const { data: sampleRecipes } = await useAsyncData('macros-sample-recipes', () =>
  queryCollection('recipes').limit(3).all()
)

// Fetch meal prep recipes
const { data: mealPrepRecipes } = await useAsyncData('macros-mealprep-recipes', () =>
  queryCollection('recipes').where('category', 'LIKE', '%meal-prep%').limit(3).all()
)

const steps = [
  {
    title: 'Grundumsatz berechnen',
    description: 'Dein Grundumsatz ist die Energie, die dein Körper in Ruhe verbraucht. Nutze die Harris-Benedict-Formel oder einen Online-Rechner.'
  },
  {
    title: 'Aktivitätsfaktor einberechnen',
    description: 'Multipliziere deinen Grundumsatz mit deinem Aktivitätslevel (1,2 für wenig aktiv bis 1,9 für sehr aktiv).'
  },
  {
    title: 'Ziel festlegen',
    description: 'Für Abnehmen: 300-500 kcal abziehen. Für Muskelaufbau: 200-400 kcal addieren. Für Erhalt: Gesamtumsatz beibehalten.'
  },
  {
    title: 'Makros aufteilen',
    description: 'Verteile deine Kalorien auf Protein (1,6-2,2g/kg), Fett (0,8-1g/kg) und fülle den Rest mit Kohlenhydraten.'
  }
]

const relatedArticles = [
  { title: 'Was ist High Protein?', to: '/ernaehrungswissen/was-ist-high-protein' },
  { title: 'Abnehmen mit Makros', to: '/ernaehrungswissen/abnehmen-mit-macros' },
  { title: 'Meal Prep für Anfänger', to: '/ernaehrungswissen/meal-prep-anfaenger' }
]
</script>

<template>
  <UContainer class="pt-6 md:pt-10">
    <!-- Hero -->
    <div class="mb-10">
      <ULink
        to="/ernaehrungswissen"
        class="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary mb-6"
      >
        <UIcon name="i-lucide-arrow-left" />
        Ernährungswissen
      </ULink>

      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
          <UIcon
            name="i-lucide-calculator"
            class="w-6 h-6 text-white"
          />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold">
          Makros berechnen
        </h1>
      </div>
      <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
        Makronährstoffe – kurz Makros – sind Protein, Kohlenhydrate und Fett. Die richtige Verteilung ist entscheidend für deinen Erfolg beim Muskelaufbau oder Abnehmen.
      </p>
    </div>

    <article>
      <!-- Section 1 -->
      <h2 class="text-2xl font-bold mb-4">
        Was sind Makronährstoffe?
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        Makronährstoffe sind die drei Hauptnährstoffe, die deinem Körper Energie liefern:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4 text-center">
          <div class="text-2xl font-bold text-primary mb-1">
            Protein
          </div>
          <div class="text-neutral-600 dark:text-neutral-400 text-sm">
            4 kcal pro Gramm
          </div>
          <div class="text-xs text-neutral-500 mt-1">
            Baustein für Muskeln
          </div>
        </div>
        <div class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4 text-center">
          <div class="text-2xl font-bold text-primary mb-1">
            Kohlenhydrate
          </div>
          <div class="text-neutral-600 dark:text-neutral-400 text-sm">
            4 kcal pro Gramm
          </div>
          <div class="text-xs text-neutral-500 mt-1">
            Hauptenergiequelle
          </div>
        </div>
        <div class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4 text-center">
          <div class="text-2xl font-bold text-primary mb-1">
            Fett
          </div>
          <div class="text-neutral-600 dark:text-neutral-400 text-sm">
            9 kcal pro Gramm
          </div>
          <div class="text-xs text-neutral-500 mt-1">
            Hormone & Vitamine
          </div>
        </div>
      </div>
      <p class="text-neutral-600 dark:text-neutral-400 mb-12">
        Die Summe aller Makros ergibt deine tägliche Kalorienzufuhr. Wenn du weißt, wie viel von jedem Makro du brauchst, kannst du deine Ernährung optimal auf deine Ziele abstimmen.
      </p>

      <!-- Section 2 -->
      <h2 class="text-2xl font-bold mb-4">
        So berechnest du deine Makros
      </h2>
      <div class="space-y-4 mb-12">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-5"
        >
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-white font-bold text-sm">
              {{ index + 1 }}
            </div>
            <div>
              <h3 class="font-semibold mb-1">
                {{ step.title }}
              </h3>
              <p class="text-neutral-600 dark:text-neutral-400 text-sm">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sample Recipes with Macros -->
      <div
        v-if="sampleRecipes?.length"
        class="mb-12"
      >
        <h3 class="text-xl font-semibold mb-2">
          Rezepte mit berechneten Makros
        </h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-4">
          Bei allen unseren Rezepten siehst du Protein, Kalorien und Zubereitungszeit auf einen Blick:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecipeCard
            v-for="recipe in sampleRecipes"
            :key="recipe.path"
            :recipe="recipe"
          />
        </div>
        <div class="mt-4">
          <UButton
            to="/rezepte"
            variant="soft"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
            size="md"
          >
            Alle Rezepte entdecken
          </UButton>
        </div>
      </div>

      <!-- Section 3 -->
      <h2 class="text-2xl font-bold mb-4">
        Beispielrechnung für 80kg
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        Nehmen wir eine Person mit 80kg Körpergewicht, die moderat aktiv ist und Muskeln aufbauen möchte:
      </p>
      <div class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 mb-6 space-y-3">
        <div class="flex justify-between">
          <span class="text-neutral-600 dark:text-neutral-400">Grundumsatz (Harris-Benedict)</span>
          <span class="font-medium">1.800 kcal</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600 dark:text-neutral-400">× Aktivitätsfaktor (1,55)</span>
          <span class="font-medium">2.790 kcal</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600 dark:text-neutral-400">+ Kalorienüberschuss</span>
          <span class="font-medium">+ 300 kcal</span>
        </div>
        <div class="flex justify-between border-t border-neutral-300 dark:border-neutral-700 pt-3">
          <span class="font-semibold">Gesamtkalorien</span>
          <span class="font-bold text-primary text-lg">3.090 kcal</span>
        </div>
      </div>

      <h3 class="text-xl font-semibold mb-4">
        Makroverteilung
      </h3>
      <div class="space-y-3 mb-12">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-primary" />
          <span class="text-neutral-600 dark:text-neutral-400">
            <strong>Protein:</strong> 80kg × 2g = 160g (640 kcal)
          </span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-pink-500" />
          <span class="text-neutral-600 dark:text-neutral-400">
            <strong>Fett:</strong> 80kg × 1g = 80g (720 kcal)
          </span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-amber-500" />
          <span class="text-neutral-600 dark:text-neutral-400">
            <strong>Kohlenhydrate:</strong> (3.090 - 640 - 720) ÷ 4 = 433g (1.730 kcal)
          </span>
        </div>
      </div>

      <!-- Section 4 -->
      <h2 class="text-2xl font-bold mb-4">
        Tipps für den Alltag
      </h2>
      <div class="space-y-3 mb-12">
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-check"
            class="w-5 h-5 text-primary mt-0.5 shrink-0"
          />
          <span class="text-neutral-600 dark:text-neutral-400">Nutze eine App wie MyFitnessPal zum Tracken</span>
        </div>
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-check"
            class="w-5 h-5 text-primary mt-0.5 shrink-0"
          />
          <span class="text-neutral-600 dark:text-neutral-400">Bereite Mahlzeiten mit bekannten Makros vor (Meal Prep)</span>
        </div>
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-check"
            class="w-5 h-5 text-primary mt-0.5 shrink-0"
          />
          <span class="text-neutral-600 dark:text-neutral-400">Fokussiere dich zuerst auf Protein – der Rest ist flexibler</span>
        </div>
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-check"
            class="w-5 h-5 text-primary mt-0.5 shrink-0"
          />
          <span class="text-neutral-600 dark:text-neutral-400">Passe deine Makros alle 2-4 Wochen an deinen Fortschritt an</span>
        </div>
      </div>

      <!-- Meal Prep Recipes -->
      <div
        v-if="mealPrepRecipes?.length"
        class="mb-12"
      >
        <h3 class="text-xl font-semibold mb-2">
          Meal Prep macht Makro-Tracking einfach
        </h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-4">
          Wenn du vorkochst, weißt du genau, was in deinen Mahlzeiten steckt:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecipeCard
            v-for="recipe in mealPrepRecipes"
            :key="recipe.path"
            :recipe="recipe"
          />
        </div>
        <div class="mt-4">
          <UButton
            to="/rezepte?category=meal-prep"
            variant="soft"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
            size="md"
          >
            Alle Meal Prep Rezepte
          </UButton>
        </div>
      </div>

      <!-- CTA -->
      <div class="flex flex-wrap gap-3 mb-12">
        <UButton
          to="/rezepte"
          size="lg"
          color="primary"
        >
          Rezepte mit Makros entdecken
        </UButton>
        <UButton
          to="/ernaehrungswissen/abnehmen-mit-macros"
          size="lg"
          variant="outline"
          color="neutral"
        >
          Abnehmen mit Makros
        </UButton>
      </div>

      <!-- Related Articles -->
      <div class="border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <h3 class="font-semibold mb-4">
          Weiterlesen
        </h3>
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="article in relatedArticles"
            :key="article.to"
            :to="article.to"
            variant="soft"
            color="neutral"
            size="sm"
          >
            {{ article.title }}
          </UButton>
        </div>
      </div>
    </article>
  </UContainer>
</template>
