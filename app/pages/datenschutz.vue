<script setup lang="ts">
useSeoMeta({
  title: 'Datenschutz',
  description: 'Datenschutzerklärung von Fit Kitchen',
  robots: 'noindex, nofollow'
})

useHead({
  script: [
    {
      'id': 'usercentrics-ppg',
      'src': 'https://policygenerator.usercentrics.eu/api/privacy-policy',
      // @ts-expect-error custom attribute for usercentrics
      'privacy-policy-id': '98d47c3b-5b2c-4d24-bf87-5dd4ca873ba6'
    }
  ]
})
</script>

<template>
  <UContainer class="pt-8 md:pt-12">
    <div class="uc-privacy-policy" />
  </UContainer>
</template>

<style lang="css">
  .privacy-wrapper {
    padding: 0 !important;

    .privacy-footer {
      display: none;
    }
  }
</style>
