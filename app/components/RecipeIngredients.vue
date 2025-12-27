<script setup lang="ts">
interface Ingredient {
  name: string
  amount: number
  unit: string
}

const props = defineProps<{
  ingredients: Ingredient[]
  baseServings: number
}>()

const servings = defineModel<number>('servings', { default: 4 })

const scaledIngredients = computed(() => {
  const scale = servings.value / props.baseServings
  return props.ingredients.map(ing => ({
    ...ing,
    scaledAmount: formatAmount(ing.amount * scale)
  }))
})

function formatAmount(amount: number): string {
  if (amount === Math.floor(amount)) {
    return amount.toString()
  }
  return amount.toFixed(1).replace('.0', '').replace('.', ',')
}

function decrease() {
  if (servings.value > 1) {
    servings.value--
  }
}

function increase() {
  if (servings.value < 20) {
    servings.value++
  }
}
</script>

<template>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">
        Zutaten
      </h2>
      <div class="flex items-center gap-1">
        <UButton
          icon="i-lucide-minus"
          color="neutral"
          variant="soft"
          size="xs"
          class="cursor-pointer"
          :disabled="servings <= 1"
          @click="decrease"
        />
        <span class="text-sm font-medium min-w-16 text-center">
          {{ servings }} {{ servings === 1 ? 'Portion' : 'Portionen' }}
        </span>
        <UButton
          icon="i-lucide-plus"
          color="neutral"
          variant="soft"
          size="xs"
          class="cursor-pointer"
          :disabled="servings >= 20"
          @click="increase"
        />
      </div>
    </div>

    <ul class="space-y-1">
      <li
        v-for="(ingredient, index) in scaledIngredients"
        :key="index"
        class="flex items-center justify-between py-1.5 text-sm"
      >
        <span>{{ ingredient.name }}</span>
        <span class="font-medium text-neutral-600 dark:text-neutral-400">
          {{ ingredient.scaledAmount }} {{ ingredient.unit }}
        </span>
      </li>
    </ul>
  </div>
</template>
