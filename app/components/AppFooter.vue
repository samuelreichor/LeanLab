<script setup lang="ts">
const columns = [{
  label: 'Rezepte',
  children: [{
    label: 'Alle Rezepte',
    to: '/rezepte'
  }, {
    label: 'Meal Prep',
    to: '/rezepte/meal-prep'
  }, {
    label: 'Muskelaufbau',
    to: '/rezepte/muskelaufbau'
  }, {
    label: 'Abnehmen',
    to: '/rezepte/abnehmen'
  }, {
    label: 'Vegetarisch',
    to: '/rezepte/vegetarisch'
  }]
}, {
  label: 'Ernährungswissen',
  children: [{
    label: 'Übersicht',
    to: '/ernaehrungswissen'
  }, {
    label: 'Was ist High Protein?',
    to: '/ernaehrungswissen/was-ist-high-protein'
  }, {
    label: 'Makros berechnen',
    to: '/ernaehrungswissen/macros-berechnen'
  }, {
    label: 'Abnehmen mit Makros',
    to: '/ernaehrungswissen/abnehmen-mit-macros'
  }, {
    label: 'Meal Prep Guide',
    to: '/ernaehrungswissen/meal-prep-anfaenger'
  }]
}, {
  label: 'Company',
  children: [{
    label: 'Über uns',
    to: '/ueber-uns'
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
    class="h-px mt-16 md:mt-20 print:hidden"
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
        Fit Kitchen © {{ new Date().getFullYear() }}
      </p>
    </template>
  </UFooter>
</template>
