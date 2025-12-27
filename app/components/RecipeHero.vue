<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  category: string[]
  prepTime: number
  difficulty: 'einfach' | 'mittel' | 'schwierig'
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
</script>

<template>
  <!-- Mobile: Stacked layout -->
  <div class="md:hidden">
    <div class="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
      <NuxtImg
        :src="image"
        :alt="title"
        class="absolute inset-0 w-full h-full object-cover"
      />
    </div>

    <div class="mt-4 space-y-3">
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

      <h1 class="text-2xl font-bold">
        {{ title }}
      </h1>
      <p class="text-neutral-600 dark:text-neutral-400">
        {{ description }}
      </p>
    </div>
  </div>

  <!-- Desktop: Overlay layout -->
  <div class="hidden md:block relative w-full h-96 lg:h-[28rem] overflow-hidden rounded-2xl">
    <NuxtImg
      :src="image"
      :alt="title"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

    <div class="absolute bottom-0 left-0 right-0 p-8">
      <div class="flex flex-wrap gap-2 mb-4">
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

      <h1 class="text-4xl lg:text-5xl font-bold text-white mb-2">
        {{ title }}
      </h1>
      <p class="text-lg text-white/80 max-w-2xl">
        {{ description }}
      </p>
    </div>
  </div>
</template>
