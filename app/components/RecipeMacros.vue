<script setup lang="ts">
interface Macros {
  kcal: number
  protein: number
  carbs: number
  fat: number
}

const props = defineProps<{
  macros: Macros
}>()

const macroItems = computed(() => [
  { label: 'Kcal', value: props.macros.kcal, unit: '', icon: 'i-lucide-flame', color: 'text-orange-500' },
  { label: 'Protein', value: props.macros.protein, unit: 'g', icon: 'i-lucide-beef', color: 'text-red-500' },
  { label: 'Carbs', value: props.macros.carbs, unit: 'g', icon: 'i-lucide-wheat', color: 'text-amber-500' },
  { label: 'Fett', value: props.macros.fat, unit: 'g', icon: 'i-lucide-droplet', color: 'text-yellow-500' }
])
</script>

<template>
  <div class="flex flex-wrap gap-4 md:gap-6">
    <div
      v-for="item in macroItems"
      :key="item.label"
      class="flex items-center gap-1.5"
    >
      <UIcon
        :name="item.icon"
        :class="['w-4 h-4', item.color]"
      />
      <span class="font-semibold">{{ item.value }}{{ item.unit }}</span>
      <span class="text-neutral-500 text-sm">{{ item.label }}</span>
    </div>
  </div>
</template>
