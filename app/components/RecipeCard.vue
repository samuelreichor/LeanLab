<script setup lang="ts">
interface Recipe {
  path?: string
  title: string
  description: string
  image: string
  category?: string[]
  prepTime?: number
  macros?: {
    protein: number
    kcal: number
  }
}

defineProps<{
  recipe: Recipe
}>()

const categoryLabels: Record<string, string> = {
  'meal-prep': 'Meal Prep',
  'muskel-aufbau': 'Muskelaufbau',
  'abnehmen': 'Abnehmen',
  'vegetarisch': 'Vegetarisch'
}

function formatPrepTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
}
</script>

<template>
  <NuxtLink
    :to="recipe.path?.replace('/recipes', '/rezepte')"
    class="group"
  >
    <div class="bg-white rounded-2xl overflow-hidden border border-neutral-200 h-full relative flex flex-col">
      <div class="relative aspect-4/3 overflow-hidden">
        <NuxtImg
          :src="recipe.image"
          :alt="recipe.title"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute top-3 left-3 flex flex-wrap gap-1">
          <span
            v-for="cat in recipe.category"
            :key="cat"
            class="inline-block px-3 py-1 bg-white/90 dark:bg-neutral-900/90 rounded-full text-xs font-medium"
          >
            {{ categoryLabels[cat] || cat }}
          </span>
        </div>
      </div>

      <div class="p-5 flex flex-col grow">
        <div class="grow">
          <h3 class="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {{ recipe.title }}
          </h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {{ recipe.description }}
          </p>
        </div>

        <div class="flex items-center justify-between text-sm text-neutral-500 pt-4 mt-4 border-t border-neutral-100">
          <div class="flex items-center gap-1">
            <UIcon
              name="i-lucide-beef"
              class="w-4 h-4"
            />
            <span>{{ recipe.macros?.protein }}g P</span>
          </div>
          <div class="flex items-center gap-1">
            <UIcon
              name="i-lucide-flame"
              class="w-4 h-4"
            />
            <span>{{ recipe.macros?.kcal }} kcal</span>
          </div>
          <div class="flex items-center gap-1">
            <UIcon
              name="i-lucide-clock"
              class="w-4 h-4"
            />
            <span>{{ formatPrepTime(recipe.prepTime ?? 0) }}</span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
