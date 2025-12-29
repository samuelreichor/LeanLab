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
  recipes: Recipe[]
}>()
</script>

<template>
  <section class="pt-12 md:pt-16">
    <UContainer>
      <div class="flex items-end justify-between mb-6 md:mb-8">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold mb-2">
            Beliebte Rezepte
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            Die proteinreichsten Rezepte aus unserer Sammlung
          </p>
        </div>
        <NuxtLink
          to="/r"
          class="hidden sm:flex items-center gap-1 text-primary font-medium hover:underline"
        >
          Alle Rezepte
          <UIcon
            name="i-lucide-arrow-right"
            class="w-4 h-4"
          />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.path"
          :recipe="recipe"
        />
      </div>

      <div class="mt-8 sm:hidden">
        <UButton
          to="/r"
          size="xl"
          color="primary"
          trailing-icon="i-lucide-arrow-right"
        >
          Alle Rezepte entdecken
        </UButton>
      </div>
    </UContainer>
  </section>
</template>
