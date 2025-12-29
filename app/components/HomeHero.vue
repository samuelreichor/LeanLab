<script setup lang="ts">
interface Recipe {
  macros?: {
    protein: number
    kcal: number
  }
  prepTime?: number
}

const props = defineProps<{
  recipes: Recipe[]
}>()

const stats = computed(() => {
  const recipeCount = props.recipes.length
  if (recipeCount === 0) return []

  const avgProtein = Math.round(
    props.recipes.reduce((sum, r) => sum + (r.macros?.protein ?? 0), 0) / recipeCount
  )

  const avgKcal = Math.round(
    props.recipes.reduce((sum, r) => sum + (r.macros?.kcal ?? 0), 0) / recipeCount
  )

  const avgPrepTime = Math.round(
    props.recipes.reduce((sum, r) => sum + (r.prepTime ?? 0), 0) / recipeCount
  )

  const quickRecipes = props.recipes.filter(r => (r.prepTime ?? 0) < 20).length

  return [
    { value: `${recipeCount}`, label: 'Rezepte', fullLabel: `${recipeCount} High-Protein Rezepte`, icon: 'i-lucide-book-open', span: 2 },
    { value: `${avgProtein}g`, label: 'Ø Protein', fullLabel: `Durchschnittlich ${avgProtein}g Protein pro Portion`, icon: 'i-lucide-beef', span: 2 },
    { value: `${avgKcal}`, label: 'Ø Kalorien', fullLabel: `Durchschnittlich ${avgKcal} Kalorien pro Portion`, icon: 'i-lucide-flame', span: 1 },
    { value: `${avgPrepTime} min`, label: 'Ø Zeit', fullLabel: `Durchschnittliche Zubereitungszeit ${avgPrepTime} Minuten`, icon: 'i-lucide-clock', span: 2 },
    { value: `${quickRecipes}`, label: 'Schnelle', fullLabel: `${quickRecipes} schnelle Rezepte unter 20 Minuten`, icon: 'i-lucide-zap', span: 1 }
  ]
})
</script>

<template>
  <section class="pt-6 md:pt-10">
    <UContainer>
      <div class="flex flex-col lg:flex-row lg:justify-between gap-6 md:gap-12">
        <!-- Left: Text & CTA -->
        <div class="lg:max-w-2xl">
          <h1 class="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-6">
            High-Protein Rezepte, die
            <span class="text-primary relative underline decoration-wavy decoration-pink-200 underline-offset-8 decoration-4">
              wirklich schmecken.
            </span>
          </h1>

          <p class="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8">
            Entdecke einfache Fitness-Rezepte mit berechneten Makros. Optimiert für Muskelaufbau, Abnehmen und Meal Prep.
          </p>

          <dl
            class="flex lg:hidden flex-wrap gap-2 mb-6 md:mb-8"
            aria-label="Rezept-Statistiken"
          >
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-3 py-2 text-center"
            >
              <dt class="sr-only">
                {{ stat.fullLabel }}
              </dt>
              <dd>
                <span class="text-lg font-bold text-primary">
                  {{ stat.value }}
                </span>
                <span class="block text-xs text-neutral-500 dark:text-neutral-400">
                  {{ stat.label }}
                </span>
              </dd>
            </div>
          </dl>

          <UButton
            to="/r"
            size="xl"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
          >
            Alle Rezepte entdecken
          </UButton>
        </div>

        <!-- Desktop: Grid Layout -->
        <dl
          class="hidden lg:grid grid-cols-4 gap-3 shrink-0 w-105"
          aria-label="Rezept-Statistiken"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            :class="[
              'bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-5 text-center',
              stat.span === 2 ? 'col-span-2' : ''
            ]"
          >
            <dt class="sr-only">
              {{ stat.fullLabel }}
            </dt>
            <dd>
              <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <UIcon
                  :name="stat.icon"
                  class="w-6 h-6 text-primary"
                  aria-hidden="true"
                />
              </div>
              <span class="block text-2xl lg:text-3xl font-bold text-primary">
                {{ stat.value }}
              </span>
              <span class="block text-sm text-neutral-500 dark:text-neutral-400">
                {{ stat.label }}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </UContainer>
  </section>
</template>
