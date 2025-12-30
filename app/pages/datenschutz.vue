<script setup lang="ts">
const { data: page } = await useAsyncData('datenschutz', () =>
  queryCollection('pages').path('/datenschutz').first()
)

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  robots: 'noindex, nofollow'
})
</script>

<template>
  <UContainer class="py-8 md:py-12">
    <h1 class="text-3xl md:text-4xl font-bold mb-8">
      {{ page?.title }}
    </h1>

    <div class="max-w-3xl">
      <ContentRenderer
        v-if="page"
        :value="page"
        class="max-w-none"
      />
    </div>
  </UContainer>
</template>
