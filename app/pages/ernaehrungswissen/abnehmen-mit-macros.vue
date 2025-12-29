<script setup lang="ts">
useSeoMeta({
  title: 'Abnehmen mit Makros - Der effektive Weg zur Gewichtsabnahme',
  description: 'Lerne, wie du mit Makro-Tracking erfolgreich abnimmst. Kalorienzählen war gestern – mit der richtigen Makroverteilung erreichst du dein Ziel nachhaltig.',
  ogTitle: 'Abnehmen mit Makros | Fit Kitchen',
  ogDescription: 'Der effektive Weg zur Gewichtsabnahme durch intelligentes Makro-Tracking.',
  ogUrl: 'https://fit-kitchen.at/ernaehrungswissen/abnehmen-mit-macros'
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Abnehmen mit Makros - Der effektive Weg zur Gewichtsabnahme',
  'description': 'Lerne, wie du mit Makro-Tracking erfolgreich abnimmst.',
  'author': {
    '@type': 'Person',
    'name': 'Samuel Reichör'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'Fit Kitchen',
    'url': 'https://fit-kitchen.at'
  }
}

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }]
})

// Fetch weight loss recipes
const { data: abnehmenRecipes } = await useAsyncData('abnehmen-recipes', () =>
  queryCollection('recipes').where('category', 'LIKE', '%abnehmen%').limit(3).all()
)

// Fetch high protein recipes
const { data: highProteinRecipes } = await useAsyncData('abnehmen-protein-recipes', () =>
  queryCollection('recipes').where('category', 'LIKE', '%muskel-aufbau%').limit(3).all()
)

const tips = [
  {
    icon: 'i-lucide-beef',
    title: 'Protein priorisieren',
    description: 'Halte dein Protein hoch (2-2,4g/kg), um Muskeln zu erhalten und länger satt zu bleiben.'
  },
  {
    icon: 'i-lucide-droplet',
    title: 'Fett nicht streichen',
    description: 'Mindestens 0,8g/kg Fett für Hormone und Sättigung. Fett ist nicht der Feind.'
  },
  {
    icon: 'i-lucide-wheat',
    title: 'Kohlenhydrate anpassen',
    description: 'Reduziere Kohlenhydrate moderat. Sie sind die flexibelste Variable beim Abnehmen.'
  },
  {
    icon: 'i-lucide-scale',
    title: 'Moderates Defizit wählen',
    description: '300-500 kcal Defizit sind nachhaltig. Zu wenig essen führt zu Muskelabbau und Heißhunger.'
  }
]

const mistakes = [
  { title: 'Zu wenig Protein', description: 'Führt zu Muskelabbau und ständigem Hunger' },
  { title: 'Zu großes Defizit', description: 'Stoffwechsel verlangsamt sich, Heißhunger entsteht' },
  { title: 'Fett komplett streichen', description: 'Hormone geraten durcheinander' },
  { title: 'Nur auf die Waage schauen', description: 'Muskelaufbau kann Gewicht halten, obwohl Fett schmilzt' }
]

const relatedArticles = [
  { title: 'Was ist High Protein?', to: '/ernaehrungswissen/was-ist-high-protein' },
  { title: 'Makros berechnen', to: '/ernaehrungswissen/macros-berechnen' },
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
            name="i-lucide-trending-down"
            class="w-6 h-6 text-white"
          />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold">
          Abnehmen mit Makros
        </h1>
      </div>
      <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
        Vergiss strenge Diäten. Mit der richtigen Makroverteilung nimmst du ab, behältst deine Muskeln und bleibst satt – ohne ständig hungrig zu sein.
      </p>
    </div>

    <article class="">
      <!-- Section 1 -->
      <h2 class="text-2xl font-bold mb-4">
        Warum Makros statt nur Kalorien?
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        Abnehmen bedeutet im Kern: weniger Kalorien aufnehmen als du verbrauchst. Aber <em>woher</em> diese Kalorien kommen, macht einen riesigen Unterschied:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <UIcon
              name="i-lucide-x"
              class="w-5 h-5 text-red-500"
            />
            <span class="font-medium">500 kcal Süßigkeiten</span>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Nach einer Stunde wieder hungrig
          </p>
        </div>
        <div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <UIcon
              name="i-lucide-check"
              class="w-5 h-5 text-green-500"
            />
            <span class="font-medium">500 kcal Hähnchen & Gemüse</span>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Stundenlang satt und zufrieden
          </p>
        </div>
      </div>
      <p class="text-neutral-600 dark:text-neutral-400 mb-12">
        Makro-Tracking hilft dir, nicht nur die Kalorienmenge, sondern auch die Qualität deiner Ernährung zu optimieren.
      </p>

      <!-- Section 2 -->
      <h2 class="text-2xl font-bold mb-4">
        Die optimale Makroverteilung zum Abnehmen
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        Für eine erfolgreiche Gewichtsabnahme empfehlen wir:
      </p>
      <div class="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-6 mb-12">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-3xl font-bold text-primary">
              2-2,4g
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Protein pro kg
            </div>
          </div>
          <div>
            <div class="text-3xl font-bold text-primary">
              0,8-1g
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Fett pro kg
            </div>
          </div>
          <div>
            <div class="text-3xl font-bold text-primary">
              Rest
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Kohlenhydrate
            </div>
          </div>
        </div>
      </div>

      <!-- Weight Loss Recipes -->
      <div
        v-if="abnehmenRecipes?.length"
        class="mb-12"
      >
        <h3 class="text-xl font-semibold mb-2">
          Kalorienarme Rezepte zum Abnehmen
        </h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-4">
          Proteinreich und kalorienarm – perfekt fürs Defizit:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecipeCard
            v-for="recipe in abnehmenRecipes"
            :key="recipe.path"
            :recipe="recipe"
          />
        </div>
        <div class="mt-4">
          <UButton
            to="/rezepte?category=abnehmen"
            variant="soft"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
            size="md"
          >
            Alle Abnehm-Rezepte
          </UButton>
        </div>
      </div>

      <!-- Section 3 -->
      <h2 class="text-2xl font-bold mb-4">
        Die 4 Grundregeln
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div
          v-for="tip in tips"
          :key="tip.title"
          class="bg-white dark:bg-neutral-900 rounded-xl p-5 border border-neutral-200 dark:border-neutral-800"
        >
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <UIcon
              :name="tip.icon"
              class="w-5 h-5 text-primary"
            />
          </div>
          <h3 class="font-semibold mb-2">
            {{ tip.title }}
          </h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            {{ tip.description }}
          </p>
        </div>
      </div>

      <!-- Section 4 -->
      <h2 class="text-2xl font-bold mb-4">
        Beispiel: Abnehmen mit 70kg
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        Eine 70kg schwere Person mit moderater Aktivität:
      </p>
      <div class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 mb-6 space-y-3">
        <div class="flex justify-between">
          <span class="text-neutral-600 dark:text-neutral-400">Gesamtumsatz</span>
          <span class="font-medium">ca. 2.200 kcal</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600 dark:text-neutral-400">Defizit</span>
          <span class="font-medium">-400 kcal</span>
        </div>
        <div class="flex justify-between border-t border-neutral-300 dark:border-neutral-700 pt-3">
          <span class="font-semibold">Ziel</span>
          <span class="font-bold text-primary text-lg">1.800 kcal</span>
        </div>
      </div>

      <h3 class="text-xl font-semibold mb-4">
        Makroverteilung
      </h3>
      <div class="space-y-3 mb-12">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-primary" />
          <span class="text-neutral-600 dark:text-neutral-400">
            <strong>Protein:</strong> 70 × 2,2 = 154g (616 kcal)
          </span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-pink-500" />
          <span class="text-neutral-600 dark:text-neutral-400">
            <strong>Fett:</strong> 70 × 0,9 = 63g (567 kcal)
          </span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-amber-500" />
          <span class="text-neutral-600 dark:text-neutral-400">
            <strong>Kohlenhydrate:</strong> (1.800 - 616 - 567) ÷ 4 = 154g (617 kcal)
          </span>
        </div>
      </div>

      <!-- Section 5 -->
      <h2 class="text-2xl font-bold mb-4">
        Häufige Fehler vermeiden
      </h2>
      <div class="space-y-3 mb-12">
        <div
          v-for="mistake in mistakes"
          :key="mistake.title"
          class="flex items-start gap-3"
        >
          <UIcon
            name="i-lucide-alert-circle"
            class="w-5 h-5 text-amber-500 mt-0.5 shrink-0"
          />
          <div>
            <span class="font-medium">{{ mistake.title }}:</span>
            <span class="text-neutral-600 dark:text-neutral-400"> {{ mistake.description }}</span>
          </div>
        </div>
      </div>

      <!-- High Protein Recipes -->
      <div
        v-if="highProteinRecipes?.length"
        class="mb-12"
      >
        <h3 class="text-xl font-semibold mb-2">
          High Protein hält dich satt
        </h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-4">
          Protein ist dein bester Freund beim Abnehmen:
        </p>
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
            Alle High Protein Rezepte
          </UButton>
        </div>
      </div>

      <!-- CTA -->
      <div class="flex flex-wrap gap-3 mb-12">
        <UButton
          to="/rezepte?category=abnehmen"
          size="lg"
          color="primary"
        >
          Rezepte zum Abnehmen
        </UButton>
        <UButton
          to="/ernaehrungswissen/meal-prep-anfaenger"
          size="lg"
          variant="outline"
          color="neutral"
        >
          Mit Meal Prep starten
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
