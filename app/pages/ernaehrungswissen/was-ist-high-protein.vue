<script setup lang="ts">
useSeoMeta({
  title: 'Was ist High Protein? Der komplette Guide zur proteinreichen Ernährung',
  description: 'Erfahre alles über High Protein Ernährung: Wie viel Protein brauchst du? Welche Lebensmittel sind proteinreich? Plus Tipps für Muskelaufbau und Abnehmen.',
  ogTitle: 'Was ist High Protein? | Fit Kitchen',
  ogDescription: 'Der komplette Guide zur proteinreichen Ernährung für Fitness und Gesundheit.',
  ogUrl: 'https://fit-kitchen.at/ernaehrungswissen/was-ist-high-protein'
})

// Schema.org
useSchemaOrg([
  defineArticle({
    headline: 'Was ist High Protein? Der komplette Guide zur proteinreichen Ernährung',
    description: 'Erfahre alles über High Protein Ernährung: Wie viel Protein brauchst du? Welche Lebensmittel sind proteinreich?',
    author: {
      name: 'Samuel Reichör',
      url: 'https://fit-kitchen.at/ueber-uns'
    }
  })
])

// Fetch high protein recipes (muskel-aufbau category)
const { data: highProteinRecipes } = await useAsyncData('high-protein-recipes', () =>
  queryCollection('recipes').where('category', 'LIKE', '%muskel-aufbau%').limit(3).all()
)

// Fetch vegetarian protein recipes
const { data: vegProteinRecipes } = await useAsyncData('veg-protein-recipes', () =>
  queryCollection('recipes').where('category', 'LIKE', '%vegetarisch%').limit(3).all()
)

const proteinSources = [
  { name: 'Hähnchenbrust', protein: '31g', per: '100g' },
  { name: 'Magerquark', protein: '12g', per: '100g' },
  { name: 'Eier', protein: '13g', per: '100g' },
  { name: 'Lachs', protein: '20g', per: '100g' },
  { name: 'Linsen (gekocht)', protein: '9g', per: '100g' },
  { name: 'Tofu', protein: '8g', per: '100g' }
]

const relatedArticles = [
  { title: 'Makros berechnen', to: '/ernaehrungswissen/macros-berechnen' },
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
            name="i-lucide-beef"
            class="w-6 h-6 text-white"
          />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold">
          Was ist High Protein?
        </h1>
      </div>
      <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
        High Protein bedeutet eine Ernährung mit erhöhtem Proteinanteil. Doch wie viel Protein brauchst du wirklich und warum ist es so wichtig für deine Fitnessziele?
      </p>
    </div>

    <article>
      <!-- Section 1 -->
      <h2 class="text-2xl font-bold mb-4">
        Warum ist Protein so wichtig?
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        Protein (Eiweiß) ist einer der drei Makronährstoffe und erfüllt im Körper zahlreiche wichtige Funktionen. Es ist der Baustein für Muskeln, Haut, Haare und Organe. Ohne ausreichend Protein kann dein Körper keine neuen Muskeln aufbauen und bestehende Muskelmasse nicht erhalten.
      </p>
      <p class="text-neutral-600 dark:text-neutral-400 mb-12">
        Besonders wenn du Sport treibst, steigt dein Proteinbedarf. Deine Muskeln benötigen die Aminosäuren aus dem Protein, um sich nach dem Training zu regenerieren und zu wachsen.
      </p>

      <!-- Section 2 -->
      <h2 class="text-2xl font-bold mb-4">
        Wie viel Protein brauchst du?
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        Die empfohlene Proteinzufuhr hängt von deinen Zielen und deinem Aktivitätslevel ab:
      </p>
      <div class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 mb-4 space-y-3">
        <div class="flex justify-between">
          <span class="text-neutral-600 dark:text-neutral-400">Normalverbraucher</span>
          <span class="font-semibold">0,8g pro kg</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600 dark:text-neutral-400">Hobbysportler</span>
          <span class="font-semibold">1,2-1,6g pro kg</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600 dark:text-neutral-400">Muskelaufbau</span>
          <span class="font-semibold text-primary">1,6-2,2g pro kg</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600 dark:text-neutral-400">Abnehmen</span>
          <span class="font-semibold text-primary">1,6-2,4g pro kg</span>
        </div>
      </div>
      <p class="text-neutral-600 dark:text-neutral-400 mb-12">
        Eine Person mit 80kg Körpergewicht, die Muskeln aufbauen möchte, sollte also täglich zwischen 128g und 176g Protein zu sich nehmen.
      </p>

      <!-- High Protein Recipes -->
      <div
        v-if="highProteinRecipes?.length"
        class="mb-12"
      >
        <h3 class="text-xl font-semibold mb-4">
          High Protein Rezepte zum Ausprobieren
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecipeCard
            v-for="recipe in highProteinRecipes"
            :key="recipe.path"
            :recipe="recipe"
          />
        </div>
        <div class="mt-4">
          <UButton
            to="/rezepte?category=muskel-aufbau"
            variant="soft"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
            size="md"
          >
            Alle Muskelaufbau Rezepte
          </UButton>
        </div>
      </div>

      <!-- Section 3 -->
      <h2 class="text-2xl font-bold mb-4">
        Vorteile einer High Protein Ernährung
      </h2>
      <div class="space-y-3 mb-12">
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-check"
            class="w-5 h-5 text-primary mt-0.5 shrink-0"
          />
          <div>
            <span class="font-medium">Muskelaufbau:</span>
            <span class="text-neutral-600 dark:text-neutral-400"> Protein liefert die Bausteine für neue Muskelmasse</span>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-check"
            class="w-5 h-5 text-primary mt-0.5 shrink-0"
          />
          <div>
            <span class="font-medium">Sättigung:</span>
            <span class="text-neutral-600 dark:text-neutral-400"> Protein hält länger satt als Kohlenhydrate oder Fett</span>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-check"
            class="w-5 h-5 text-primary mt-0.5 shrink-0"
          />
          <div>
            <span class="font-medium">Muskelerhalt beim Abnehmen:</span>
            <span class="text-neutral-600 dark:text-neutral-400"> Verhindert Muskelabbau im Kaloriendefizit</span>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-check"
            class="w-5 h-5 text-primary mt-0.5 shrink-0"
          />
          <div>
            <span class="font-medium">Höherer Kalorienverbrauch:</span>
            <span class="text-neutral-600 dark:text-neutral-400"> Der Körper verbraucht mehr Energie bei der Proteinverdauung</span>
          </div>
        </div>
      </div>

      <!-- Section 4 -->
      <h2 class="text-2xl font-bold mb-4">
        Die besten Proteinquellen
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        Nicht alle Proteinquellen sind gleich. Hier sind die besten Lebensmittel für deinen Proteinbedarf:
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        <div
          v-for="source in proteinSources"
          :key="source.name"
          class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4"
        >
          <div class="text-2xl font-bold text-primary">
            {{ source.protein }}
          </div>
          <div class="font-medium">
            {{ source.name }}
          </div>
          <div class="text-sm text-neutral-500">
            pro {{ source.per }}
          </div>
        </div>
      </div>

      <!-- Vegetarian Protein Recipes -->
      <div
        v-if="vegProteinRecipes?.length"
        class="mb-12"
      >
        <h3 class="text-xl font-semibold mb-4">
          Vegetarische Proteinquellen
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecipeCard
            v-for="recipe in vegProteinRecipes"
            :key="recipe.path"
            :recipe="recipe"
          />
        </div>
        <div class="mt-4">
          <UButton
            to="/rezepte?category=vegetarisch"
            variant="soft"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
            size="md"
          >
            Alle vegetarischen Rezepte
          </UButton>
        </div>
      </div>

      <!-- CTA -->
      <h2 class="text-2xl font-bold mb-4">
        Starte jetzt mit High Protein
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-6">
        Bei Fit Kitchen findest du hunderte Rezepte mit hohem Proteingehalt. Alle Rezepte haben berechnete Makros, sodass du genau weißt, wie viel Protein du zu dir nimmst.
      </p>
      <div class="flex flex-wrap gap-3 mb-12">
        <UButton
          to="/rezepte"
          size="lg"
          color="primary"
        >
          Alle Rezepte entdecken
        </UButton>
        <UButton
          to="/ernaehrungswissen/macros-berechnen"
          size="lg"
          variant="outline"
          color="neutral"
        >
          Makros berechnen lernen
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
