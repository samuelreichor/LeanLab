<script setup lang="ts">
const route = useRoute()

// Only activate WakeLock on client to avoid hydration issues
onMounted(() => {
  useWakeLock({ autoActivate: true })
})

const slug = computed(() => {
  const slugParam = route.params.slug
  if (Array.isArray(slugParam)) {
    return slugParam.join('/')
  }
  return slugParam || ''
})

const { data: recipe } = await useAsyncData(`recipe-${slug.value}`, () =>
  queryCollection('recipes').path(`/rezepte/${slug.value}`).first()
)

// Throw 404 if recipe not found (only on server to avoid hydration issues)
if (import.meta.server && !recipe.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Rezept nicht gefunden'
  })
}

// Fetch all recipes for similar recipes section (lazy to not block initial render)
const { data: allRecipes } = useLazyAsyncData('all-recipes', () =>
  queryCollection('recipes')
    .select('path', 'title', 'description', 'image', 'category', 'prepTime', 'macros')
    .all()
)

// Track user-modified servings separately to avoid hydration mismatch
const userServings = ref<number | null>(null)
const servings = computed({
  get: () => userServings.value ?? recipe.value?.servings ?? 4,
  set: (val: number) => { userServings.value = val }
})

// Find similar recipes based on shared categories
const similarRecipes = computed(() => {
  if (!allRecipes.value || !recipe.value?.category) return []

  const currentCategories = recipe.value.category
  const currentPath = recipe.value.path

  return allRecipes.value
    .filter((r) => {
      // Exclude current recipe
      if (r.path === currentPath) return false
      // Check for shared categories
      return r.category?.some(cat => currentCategories.includes(cat))
    })
    .sort((a, b) => {
      // Sort by number of shared categories (most similar first)
      const aShared = a.category?.filter(cat => currentCategories.includes(cat)).length ?? 0
      const bShared = b.category?.filter(cat => currentCategories.includes(cat)).length ?? 0
      return bShared - aShared
    })
    .slice(0, 3) // Limit to 3 similar recipes
})

function scrollToIngredients() {
  document.getElementById('ingredients')?.scrollIntoView({ behavior: 'smooth' })
}

// SEO Meta - use computed values for reactivity
useSeoMeta({
  title: () => recipe.value?.title,
  description: () => recipe.value?.description,
  ogImage: () => recipe.value?.image
})

if (recipe.value) {
  defineOgImageComponent('Recipe', {
    title: recipe.value.title,
    prepTime: recipe.value.prepTime,
    protein: recipe.value.macros?.protein,
    kcal: recipe.value.macros?.kcal
  })

  // Schema.org Recipe
  useSchemaOrg([
    defineRecipe({
      name: recipe.value.title,
      description: recipe.value.description,
      image: recipe.value.image,
      prepTime: `PT${recipe.value.prepTime}M`,
      recipeYield: `${recipe.value.servings} Portionen`,
      recipeIngredient: recipe.value.ingredients?.map(i => `${i.amount} ${i.unit} ${i.name}`),
      recipeCategory: 'Main course',
      nutrition: {
        '@type': 'NutritionInformation',
        'calories': `${recipe.value.macros?.kcal} kcal`,
        'proteinContent': `${recipe.value.macros?.protein} g`,
        'carbohydrateContent': `${recipe.value.macros?.carbs} g`,
        'fatContent': `${recipe.value.macros?.fat} g`
      }
    })
  ])
}
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

    <RecipeMacros
      :macros="recipe.macros"
      class="mt-6"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 md:gap-x-8 mt-6 md:mt-10">
      <div
        id="ingredients"
        class="lg:col-span-1 space-y-4 lg:sticky lg:top-4 lg:self-start"
      >
        <ClientOnly>
          <RecipeIngredients
            v-model:servings="servings"
            :ingredients="recipe.ingredients"
            :base-servings="recipe.servings ?? 4"
          />
          <template #fallback>
            <div class="bg-neutral-100 rounded-xl p-4 animate-pulse">
              <div class="h-6 bg-neutral-200 rounded w-24 mb-4" />
              <div class="space-y-2">
                <div
                  v-for="i in 6"
                  :key="i"
                  class="h-4 bg-neutral-200 rounded"
                />
              </div>
            </div>
          </template>
        </ClientOnly>

        <RecipeAuthor class="mt-4 print:hidden" />
      </div>

      <div class="lg:col-span-2 mt-8 md:mt-0">
        <ContentRenderer
          :value="recipe"
          class="prose prose-neutral dark:prose-invert max-w-none [&>*:first-child]:mt-0"
        />
      </div>
    </div>

    <!-- Similar Recipes Section - ClientOnly to avoid hydration mismatch from useLazyAsyncData -->
    <ClientOnly>
      <section
        v-if="similarRecipes.length > 0"
        class="print:hidden mt-12 md:mt-16 pt-12 md:pt-16 border-t border-neutral-200"
      >
        <h2 class="text-2xl md:text-3xl font-bold mb-6">
          Ähnliche Rezepte
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <RecipeCard
            v-for="similarRecipe in similarRecipes"
            :key="similarRecipe.path"
            :recipe="similarRecipe"
          />
        </div>
      </section>
    </ClientOnly>

    <UButton
      icon="i-lucide-utensils"
      size="lg"
      color="primary"
      class="lg:hidden fixed right-6 shadow-lg z-50 print:hidden bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
      @click="scrollToIngredients"
    >
      Zutaten
    </UButton>
  </UContainer>
</template>
