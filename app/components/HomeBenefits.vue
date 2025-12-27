<script setup lang="ts">
const benefits = [
  {
    icon: 'i-lucide-clock',
    title: 'Schnell zubereitet',
    description: 'Alle Rezepte in unter 60 Minuten'
  },
  {
    icon: 'i-lucide-beef',
    title: 'High-Protein',
    description: 'Durchschnittlich 30g+ pro Portion'
  },
  {
    icon: 'i-lucide-calculator',
    title: 'Makros berechnet',
    description: 'Kalorien, Protein, Carbs & Fett'
  },
  {
    icon: 'i-lucide-refrigerator',
    title: 'Meal Prep geeignet',
    description: 'Perfekt zum Vorkochen'
  }
]
</script>

<template>
  <section class="pt-12 md:pt-20">
    <UContainer>
      <div class="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-8 md:p-12">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-bold mb-3">
            Warum LeanLab?
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Rezepte, die zu deinen Fitnesszielen passen
          </p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="text-center"
          >
            <div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
              <UIcon
                :name="benefit.icon"
                class="w-7 h-7 text-white"
              />
            </div>

            <h3 class="font-semibold mb-1">
              {{ benefit.title }}
            </h3>

            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
