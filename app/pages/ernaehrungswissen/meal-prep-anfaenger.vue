<script setup lang="ts">
useSeoMeta({
  title: 'Meal Prep für Anfänger - Der komplette Guide zum Vorkochen',
  description: 'Lerne Meal Prep von Grund auf: Planung, Einkauf, Zubereitung und Lagerung. Spare Zeit und iss gesünder mit unseren Meal Prep Tipps für Anfänger.',
  ogTitle: 'Meal Prep für Anfänger | Fit Kitchen',
  ogDescription: 'Der komplette Guide zum Vorkochen – spare Zeit und iss gesünder.',
  ogUrl: 'https://fit-kitchen.at/ernaehrungswissen/meal-prep-anfaenger'
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Meal Prep für Anfänger - Der komplette Guide zum Vorkochen',
  'description': 'Lerne Meal Prep von Grund auf: Planung, Einkauf, Zubereitung und Lagerung.',
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

// Fetch meal prep recipes
const { data: mealPrepRecipes } = await useAsyncData('mealprep-recipes', () =>
  queryCollection('recipes').where('category', 'LIKE', '%meal-prep%').limit(4).all()
)

const steps = [
  {
    icon: 'i-lucide-calendar',
    title: 'Planung',
    description: 'Wähle 2-3 Rezepte für die Woche. Halte es am Anfang einfach.'
  },
  {
    icon: 'i-lucide-shopping-cart',
    title: 'Einkauf',
    description: 'Kaufe alle Zutaten auf einmal. Eine Liste verhindert Impulskäufe.'
  },
  {
    icon: 'i-lucide-cooking-pot',
    title: 'Zubereitung',
    description: 'Blocke 2-3 Stunden am Wochenende. Koche mehrere Gerichte parallel.'
  },
  {
    icon: 'i-lucide-refrigerator',
    title: 'Lagerung',
    description: 'Portioniere in Behälter. Beschrifte mit Datum und Inhalt.'
  }
]

const benefits = [
  { icon: 'i-lucide-clock', text: 'Zeitersparnis: Unter der Woche kein Kochen mehr' },
  { icon: 'i-lucide-piggy-bank', text: 'Geld sparen: Weniger Essen bestellen, weniger wegwerfen' },
  { icon: 'i-lucide-heart', text: 'Gesünder essen: Keine spontanen Entscheidungen für Fastfood' },
  { icon: 'i-lucide-calculator', text: 'Makros einhalten: Du weißt genau, was in deinem Essen ist' },
  { icon: 'i-lucide-smile', text: 'Weniger Stress: Die Frage "Was esse ich heute?" entfällt' }
]

const bestFoods = [
  { category: 'Proteine', items: 'Hähnchen, Hackfleisch, Eier, Tofu, Lachs', icon: 'i-lucide-beef' },
  { category: 'Kohlenhydrate', items: 'Reis, Kartoffeln, Nudeln, Quinoa', icon: 'i-lucide-wheat' },
  { category: 'Gemüse', items: 'Brokkoli, Paprika, Zucchini, Spinat', icon: 'i-lucide-salad' },
  { category: 'Saucen', items: 'Tomatensauce, Currysauce, Pesto', icon: 'i-lucide-droplet' }
]

const shelfLife = [
  { food: 'Gekochtes Fleisch', days: '3-4 Tage' },
  { food: 'Gekochter Reis/Nudeln', days: '3-4 Tage' },
  { food: 'Gekochtes Gemüse', days: '3-5 Tage' },
  { food: 'Suppen und Eintöpfe', days: '4-5 Tage' }
]

const relatedArticles = [
  { title: 'Was ist High Protein?', to: '/ernaehrungswissen/was-ist-high-protein' },
  { title: 'Makros berechnen', to: '/ernaehrungswissen/macros-berechnen' },
  { title: 'Abnehmen mit Makros', to: '/ernaehrungswissen/abnehmen-mit-macros' }
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
            name="i-lucide-refrigerator"
            class="w-6 h-6 text-white"
          />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold">
          Meal Prep für Anfänger
        </h1>
      </div>
      <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
        Meal Prep bedeutet Vorkochen. Einmal kochen, die ganze Woche gesund essen. Klingt gut? So startest du.
      </p>
    </div>

    <article>
      <!-- Section 1 -->
          <h2 class="text-2xl font-bold mb-4">
            Was ist Meal Prep?
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400 mb-12">
            Meal Prep (kurz für Meal Preparation) bedeutet, mehrere Mahlzeiten im Voraus zuzubereiten. Statt jeden Tag zu kochen, investierst du einmal pro Woche 2-3 Stunden und hast dann fertige Mahlzeiten für mehrere Tage.
          </p>

          <!-- Section 2 -->
          <h2 class="text-2xl font-bold mb-4">
            Vorteile von Meal Prep
          </h2>
          <div class="space-y-3 mb-12">
            <div
              v-for="benefit in benefits"
              :key="benefit.text"
              class="flex items-start gap-3"
            >
              <UIcon
                :name="benefit.icon"
                class="w-5 h-5 text-primary mt-0.5 shrink-0"
              />
              <span class="text-neutral-600 dark:text-neutral-400">{{ benefit.text }}</span>
            </div>
          </div>

          <!-- Meal Prep Recipes -->
          <div
            v-if="mealPrepRecipes?.length"
            class="mb-12"
          >
            <h3 class="text-xl font-semibold mb-2">
              Unsere besten Meal Prep Rezepte
            </h3>
            <p class="text-neutral-600 dark:text-neutral-400 mb-4">
              Alle Rezepte sind fürs Vorkochen optimiert und halten sich gut im Kühlschrank:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RecipeCard
                v-for="recipe in mealPrepRecipes"
                :key="recipe.path"
                :recipe="recipe"
              />
            </div>
            <div class="mt-4">
              <UButton
                to="/rezepte/meal-prep"
                variant="soft"
                color="primary"
              >
                Alle Meal Prep Rezepte
              </UButton>
            </div>
          </div>

          <!-- Section 3 -->
          <h2 class="text-2xl font-bold mb-4">
            Die 4 Schritte zum Meal Prep
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-5"
            >
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <UIcon
                    :name="step.icon"
                    class="w-5 h-5 text-white"
                  />
                </div>
                <span class="text-sm text-neutral-500 font-medium">
                  Schritt {{ index + 1 }}
                </span>
              </div>
              <h3 class="font-semibold mb-2">
                {{ step.title }}
              </h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ step.description }}
              </p>
            </div>
          </div>

          <!-- Section 4 -->
          <h2 class="text-2xl font-bold mb-4">
            Die besten Lebensmittel für Meal Prep
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400 mb-4">
            Nicht alles eignet sich zum Vorkochen. Diese Lebensmittel halten sich gut:
          </p>
          <div class="space-y-3 mb-12">
            <div
              v-for="food in bestFoods"
              :key="food.category"
              class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4 flex items-center gap-4"
            >
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <UIcon
                  :name="food.icon"
                  class="w-5 h-5 text-primary"
                />
              </div>
              <div>
                <div class="font-semibold text-primary">
                  {{ food.category }}
                </div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ food.items }}
                </div>
              </div>
            </div>
          </div>

          <!-- Section 5 -->
          <h2 class="text-2xl font-bold mb-4">
            Tipps für Anfänger
          </h2>
          <div class="space-y-3 mb-12">
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-lightbulb"
                class="w-5 h-5 text-amber-500 mt-0.5 shrink-0"
              />
              <span class="text-neutral-600 dark:text-neutral-400">
                <strong>Starte klein:</strong> Bereite erstmal nur das Mittagessen vor
              </span>
            </div>
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-lightbulb"
                class="w-5 h-5 text-amber-500 mt-0.5 shrink-0"
              />
              <span class="text-neutral-600 dark:text-neutral-400">
                <strong>Investiere in gute Behälter:</strong> Glas oder BPA-freies Plastik
              </span>
            </div>
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-lightbulb"
                class="w-5 h-5 text-amber-500 mt-0.5 shrink-0"
              />
              <span class="text-neutral-600 dark:text-neutral-400">
                <strong>Nutze den Ofen:</strong> Gemüse und Protein können gleichzeitig garen
              </span>
            </div>
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-lightbulb"
                class="w-5 h-5 text-amber-500 mt-0.5 shrink-0"
              />
              <span class="text-neutral-600 dark:text-neutral-400">
                <strong>Variation einbauen:</strong> Gleiche Basis, verschiedene Saucen
              </span>
            </div>
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-lightbulb"
                class="w-5 h-5 text-amber-500 mt-0.5 shrink-0"
              />
              <span class="text-neutral-600 dark:text-neutral-400">
                <strong>Einfrieren:</strong> Was nicht in 3-4 Tagen gegessen wird, einfrieren
              </span>
            </div>
          </div>

          <!-- Section 6 -->
          <h2 class="text-2xl font-bold mb-4">
            Haltbarkeit im Kühlschrank
          </h2>
          <div class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 mb-12">
            <div class="space-y-3">
              <div
                v-for="item in shelfLife"
                :key="item.food"
                class="flex justify-between"
              >
                <span class="text-neutral-600 dark:text-neutral-400">{{ item.food }}</span>
                <span class="font-semibold">{{ item.days }}</span>
              </div>
            </div>
          </div>


          <!-- CTA -->
          <div class="flex flex-wrap gap-3 mb-12">
            <UButton
              to="/rezepte/meal-prep"
              size="lg"
              color="primary"
            >
              Meal Prep Rezepte entdecken
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
