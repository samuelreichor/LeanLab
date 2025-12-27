<script setup lang="ts">
const items = computed(() => [{
  label: 'Rezepte',
  icon: 'i-lucide-chef-hat',
  to: '/r'
}, {
  label: 'Kategorien',
  icon: 'i-lucide-layout-grid',
  children: [
    {
      label: 'Meal Prep',
      description: 'Vorkochen für die Woche',
      icon: 'i-lucide-calendar',
      to: '/r/meal-prep'
    },
    {
      label: 'Muskelaufbau',
      description: 'Proteinreiche Gerichte',
      icon: 'i-lucide-dumbbell',
      to: '/r/muskel-aufbau'
    },
    {
      label: 'Abnehmen',
      description: 'Kalorienarme Rezepte',
      icon: 'i-lucide-scale',
      to: '/r/abnehmen'
    },
    {
      label: 'Vegetarisch',
      description: 'Fleischfreie Gerichte',
      icon: 'i-lucide-leaf',
      to: '/r/vegetarisch'
    }
  ]
}, {
  label: 'Über uns',
  icon: 'i-lucide-users',
  to: '/ueber-uns'
}])
</script>

<template>
  <UContainer>
    <UHeader :ui="{ root: 'border-none bg-none text-white', container: 'bg-primary rounded-2xl mt-4 max-w-none sm:px-6 lg:px-8' }">
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-10 shrink-0" />
        </NuxtLink>
      </template>

      <template #default>
        <UNavigationMenu
          :items="items"
          :ui="{
            link: 'text-lg text-white [&[aria-current=page]]:text-primary [&[aria-current=page]]:before:bg-white data-[state=open]:text-white hover:text-white data-[state=open]:before:bg-primary-400 hover:before:bg-primary-400',
            linkLeadingIcon: 'text-current group-hover:text-current group-data-[state=open]:text-current'
          }"
          variant="pill"
          color="primary"
          class="hidden lg:block"
        />
      </template>

      <template #right>
        <UContentSearchButton
          :collapsed="false"
          size="lg"
          variant="soft"
          class="md:w-56"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>
  </UContainer>
</template>
