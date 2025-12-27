<script setup lang="ts">
const categories = [
  {
    slug: 'meal-prep',
    label: 'Meal Prep',
    description: 'Vorkochen für die ganze Woche',
    icon: 'i-lucide-calendar'
  },
  {
    slug: 'muskel-aufbau',
    label: 'Muskelaufbau',
    description: 'Proteinreiche Gerichte',
    icon: 'i-lucide-dumbbell'
  },
  {
    slug: 'abnehmen',
    label: 'Abnehmen',
    description: 'Kalorienarme Rezepte',
    icon: 'i-lucide-scale'
  },
  {
    slug: 'vegetarisch',
    label: 'Vegetarisch',
    description: 'Fleischfreie Gerichte',
    icon: 'i-lucide-leaf'
  }
]
</script>

<template>
  <section class="pt-12 md:pt-16">
    <UContainer>
      <h2 class="text-2xl md:text-3xl font-bold mb-6">
        Kategorien
      </h2>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.slug"
          :to="`/r/${category.slug}`"
          class="group"
        >
          <div class="bg-white dark:bg-neutral-900 rounded-2xl p-4 lg:p-6 h-full border border-neutral-200 dark:border-neutral-800 transition-all hover:-translate-y-1">
            <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 lg:mb-4">
              <UIcon
                :name="category.icon"
                class="w-5 h-5 lg:w-6 lg:h-6 text-primary"
              />
            </div>

            <h3 class="font-semibold text-base lg:text-lg mb-1 group-hover:text-primary transition-colors">
              {{ category.label }}
            </h3>

            <p class="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400">
              {{ category.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </UContainer>
  </section>
</template>
