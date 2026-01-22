<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  category: string[]
  prepTime: number
  difficulty: 'leicht' | 'mittel' | 'schwierig'
}>()

const categoryLabels: Record<string, string> = {
  'meal-prep': 'Meal Prep',
  'muskel-aufbau': 'Muskelaufbau',
  'abnehmen': 'Abnehmen',
  'vegetarisch': 'Vegetarisch'
}

const difficultyColors: Record<string, string> = {
  einfach: 'success',
  mittel: 'warning',
  schwierig: 'error'
}

function formatPrepTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} Min.`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours} Std. ${mins} Min.` : `${hours} Std.`
}

function printRecipe() {
  window.print()
}
</script>

<template>
  <div>
    <!-- Bild im 16:9 Format mit max-Höhe -->
    <div class="relative w-full aspect-video max-h-80 md:max-h-96 lg:max-h-[540px] overflow-hidden rounded-2xl">
      <NuxtImg
        :src="image"
        :alt="title"
        width="1200"
        height="675"
        loading="eager"
        fetchpriority="high"
        sizes="sm:100vw md:100vw lg:1200px"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <!-- Print Button oben rechts -->
      <UButton
        icon="i-lucide-printer"
        variant="soft"
        color="neutral"
        size="lg"
        class="absolute top-4 right-4 print:hidden"
        aria-label="Rezept drucken"
        @click="printRecipe"
      />
    </div>

    <!-- Text-Bereich unterhalb des Bildes -->
    <div class="mt-4 md:mt-6 space-y-3">
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="cat in category"
          :key="cat"
          color="primary"
          variant="solid"
        >
          {{ categoryLabels[cat] || cat }}
        </UBadge>
        <UBadge
          color="neutral"
          variant="subtle"
        >
          <UIcon
            name="i-lucide-clock"
            class="w-3 h-3 mr-1"
          />
          {{ formatPrepTime(prepTime) }}
        </UBadge>
        <UBadge
          :color="difficultyColors[difficulty] as any"
          variant="subtle"
        >
          {{ difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }}
        </UBadge>
      </div>

      <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold">
        {{ title }}
      </h1>
      <p class="text-neutral-600 dark:text-neutral-400 md:text-lg max-w-2xl">
        {{ description }}
      </p>
    </div>
  </div>
</template>
