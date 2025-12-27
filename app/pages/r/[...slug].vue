<script setup lang="ts">
const route = useRoute()

const slug = computed(() => {
  const slugParam = route.params.slug
  if (Array.isArray(slugParam)) {
    return slugParam.join('/')
  }
  return slugParam || ''
})

const { data: recipe } = await useAsyncData(`recipe-${slug.value}`, () =>
  queryCollection('recipes').path(`/r/${slug.value}`).first()
)

if (!recipe.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Rezept nicht gefunden'
  })
}

const servings = ref(recipe.value.servings ?? 4)

function scrollToIngredients() {
  document.getElementById('ingredients')?.scrollIntoView({ behavior: 'smooth' })
}

useSeoMeta({
  title: recipe.value.title,
  description: recipe.value.description,
  ogImage: recipe.value.image
})
</script>

<template>
  <UContainer
    v-if="recipe"
    class="py-4"
  >
    <RecipeHero
      :title="recipe.title"
      :description="recipe.description"
      :image="recipe.image"
      :category="recipe.category"
      :prep-time="recipe.prepTime"
      :difficulty="recipe.difficulty"
    />

    <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div
        id="ingredients"
        class="lg:col-span-1 space-y-4 lg:sticky lg:top-4 lg:self-start"
      >
        <RecipeIngredients
          v-model:servings="servings"
          :ingredients="recipe.ingredients"
          :base-servings="recipe.servings ?? 4"
        />

        <RecipeMacros :macros="recipe.macros" />
      </div>

      <div class="lg:col-span-2">
        <ContentRenderer
          :value="recipe"
          class="prose prose-neutral dark:prose-invert max-w-none [&>*:first-child]:mt-0"
        />
      </div>
    </div>

    <UButton
      icon="i-lucide-list"
      size="lg"
      color="primary"
      class="lg:hidden fixed bottom-6 right-6 shadow-lg"
      @click="scrollToIngredients"
    />
  </UContainer>
</template>
