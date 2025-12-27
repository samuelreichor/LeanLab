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
  <div class="grid grid-cols-2 gap-3 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
    <div
      v-for="item in macroItems"
      :key="item.label"
      class="flex items-center gap-2"
    >
      <UIcon
        :name="item.icon"
        :class="['w-4 h-4', item.color]"
      />
      <div class="flex flex-col">
        <span class="font-semibold text-sm leading-tight">{{ item.value }}{{ item.unit }}</span>
        <span class="text-neutral-500 text-xs">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
