<script setup lang="ts">
const columns = [{
  label: 'Rezepte',
  children: [{
    label: 'Alle Rezepte',
    to: '/r',
  }, {
    label: 'Meal Prep',
    to: '/r/meal-prep',
  }, {
    label: 'Muskelaufbau',
    to: '/r/muskelaufbau',
  }, {
    label: 'Abnehmen',
    to: '/r/abnehmen',
  },{
    label: 'Vegetarisch',
    to: '/r/vegetarisch',
  }]
},{
  label: 'Company',
  children: [{
    label: 'Über uns',
    to: '/ueber-uns',
  }, {
    label: 'Datenschutz',
    to: '/datenschutz'
  }, {
    label: 'Impressum',
    to: '/impressum'
  }, {
    label: 'AGB',
    to: '/agb'
  }]
}]
</script>

<template>
  <USeparator
    class="h-px mt-16 md:mt-20"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <NewsletterForm />
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #default>
      <p class="text-sm text-muted">
        Lean Lab © {{ new Date().getFullYear() }}
      </p>
    </template>
  </UFooter>
</template>
