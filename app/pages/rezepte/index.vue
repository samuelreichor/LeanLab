<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: recipes } = await useAsyncData('recipes', () =>
  queryCollection('recipes').all()
)

// Valid filter values
const validCategories = ['meal-prep', 'muskel-aufbau', 'abnehmen', 'vegetarisch']
const validDifficulties = ['alle', 'einfach', 'mittel', 'schwierig']
const validPrepTimes = ['alle', 'schnell', 'mittel', 'lang']
const validSorts = ['newest', 'oldest', 'prep-asc', 'prep-desc', 'protein-desc', 'protein-asc', 'kcal-asc', 'kcal-desc']

// Parse initial values from query params
type QueryValue = string | string[] | null | (string | null)[] | undefined

function parseCategories(query: QueryValue): string[] {
  if (!query) return []
  if (Array.isArray(query)) {
    const filtered: string[] = []
    for (const c of query) {
      if (c !== null && validCategories.includes(c)) {
        filtered.push(c)
      }
    }
    return filtered
  }
  return query.split(',').filter(c => validCategories.includes(c))
}

function parseString(query: QueryValue, valid: string[], defaultVal: string): string {
  if (!query) return defaultVal
  if (Array.isArray(query)) {
    const first = query[0]
    return first && valid.includes(first) ? first : defaultVal
  }
  return valid.includes(query) ? query : defaultVal
}

// Filter state (initialized from query params)
const selectedCategories = ref<string[]>(parseCategories(route.query.category))
const selectedDifficulty = ref<string>(parseString(route.query.difficulty, validDifficulties, 'alle'))
const selectedPrepTime = ref<string>(parseString(route.query.time, validPrepTimes, 'alle'))
const sortBy = ref(parseString(route.query.sort, validSorts, 'newest'))
const mobileFiltersOpen = ref(false)

// Sync filters to URL
function updateQueryParams() {
  const query: Record<string, string | undefined> = {}

  if (selectedCategories.value.length > 0) {
    query.category = selectedCategories.value.join(',')
  }
  if (selectedDifficulty.value !== 'alle') {
    query.difficulty = selectedDifficulty.value
  }
  if (selectedPrepTime.value !== 'alle') {
    query.time = selectedPrepTime.value
  }
  if (sortBy.value !== 'newest') {
    query.sort = sortBy.value
  }

  router.replace({ query })
}

// Watch for filter changes and update URL
watch([selectedCategories, selectedDifficulty, selectedPrepTime, sortBy], updateQueryParams, { deep: true })

// Filter options
const categoryOptions = [
  { value: 'meal-prep', label: 'Meal Prep' },
  { value: 'muskel-aufbau', label: 'Muskel Aufbau' },
  { value: 'abnehmen', label: 'Abnehmen' },
  { value: 'vegetarisch', label: 'Vegetarisch' }
]

const difficultyOptions = [
  { value: 'alle', label: 'Alle' },
  { value: 'einfach', label: 'Einfach' },
  { value: 'mittel', label: 'Mittel' },
  { value: 'schwierig', label: 'Schwierig' }
]

const prepTimeOptions = [
  { value: 'alle', label: 'Alle' },
  { value: 'schnell', label: 'Schnell (<20min)' },
  { value: 'mittel', label: 'Mittel (20 - 60min)' },
  { value: 'lang', label: 'Lang (>1h)' }
]

const sortOptions = [
  { value: 'newest', label: 'Neuste' },
  { value: 'oldest', label: 'Älteste' },
  { value: 'prep-asc', label: 'Zeit (aufsteigend)' },
  { value: 'prep-desc', label: 'Zeit (absteigend)' },
  { value: 'protein-desc', label: 'Protein (höchste)' },
  { value: 'protein-asc', label: 'Protein (niedrigste)' },
  { value: 'kcal-asc', label: 'Kalorien (niedrigste)' },
  { value: 'kcal-desc', label: 'Kalorien (höchste)' }
]

function toggleCategory(value: string, scroll = false) {
  const index = selectedCategories.value.indexOf(value)
  if (index === -1) {
    selectedCategories.value.push(value)
  } else {
    selectedCategories.value.splice(index, 1)
  }
  if (scroll) {
    nextTick(() => scrollToResults())
  }
}

function isSelected(value: string) {
  return selectedCategories.value.includes(value)
}

function resetFilters() {
  selectedCategories.value = []
  selectedDifficulty.value = 'alle'
  selectedPrepTime.value = 'alle'
  sortBy.value = 'newest'
}

const hasActiveFilters = computed(() => {
  return selectedCategories.value.length > 0
    || selectedDifficulty.value !== 'alle'
    || selectedPrepTime.value !== 'alle'
    || sortBy.value !== 'newest'
})

// Scroll to results on mobile when filters change
function scrollToResults() {
  if (window.innerWidth < 1024) {
    document.getElementById('top-results')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Watch filter changes on mobile
watch(sortBy, () => {
  nextTick(() => scrollToResults())
})

watch(selectedDifficulty, () => {
  nextTick(() => scrollToResults())
})

watch(selectedPrepTime, () => {
  nextTick(() => scrollToResults())
})

const activeFilterCount = computed(() => {
  let count = selectedCategories.value.length
  if (selectedDifficulty.value !== 'alle') count++
  if (selectedPrepTime.value !== 'alle') count++
  if (sortBy.value !== 'newest') count++
  return count
})

// Filtered and sorted recipes
const filteredRecipes = computed(() => {
  if (!recipes.value) return []

  let result = recipes.value.filter((recipe) => {
    // Category filter
    if (selectedCategories.value.length > 0) {
      const hasCategory = recipe.category?.some(cat =>
        selectedCategories.value.includes(cat)
      )
      if (!hasCategory) return false
    }

    // Difficulty filter
    if (selectedDifficulty.value && selectedDifficulty.value !== 'alle') {
      if (recipe.difficulty !== selectedDifficulty.value) return false
    }

    // Prep time filter
    if (selectedPrepTime.value && selectedPrepTime.value !== 'alle') {
      const time = recipe.prepTime ?? 0
      if (selectedPrepTime.value === 'schnell' && time >= 20) return false
      if (selectedPrepTime.value === 'mittel' && (time < 20 || time > 60)) return false
      if (selectedPrepTime.value === 'lang' && time <= 60) return false
    }

    return true
  })

  // Sort
  result = [...result].sort((a, b) => {
    switch (sortBy.value) {
      case 'prep-asc':
        return (a.prepTime ?? 0) - (b.prepTime ?? 0)
      case 'prep-desc':
        return (b.prepTime ?? 0) - (a.prepTime ?? 0)
      case 'protein-desc':
        return (b.macros?.protein ?? 0) - (a.macros?.protein ?? 0)
      case 'protein-asc':
        return (a.macros?.protein ?? 0) - (b.macros?.protein ?? 0)
      case 'kcal-asc':
        return (a.macros?.kcal ?? 0) - (b.macros?.kcal ?? 0)
      case 'kcal-desc':
        return (b.macros?.kcal ?? 0) - (a.macros?.kcal ?? 0)
      default:
        return 0
    }
  })

  return result
})

useSeoMeta({
  title: 'Rezepte',
  description: 'Einfache High-Protein Rezepte für deine Fitnessziele'
})
</script>

<template>
  <UContainer class="pt-6 md:pt-10">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
      <!-- Filters Sidebar - Desktop -->
      <aside class="hidden lg:block lg:col-span-1 self-start sticky top-6">
        <div class="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800">
          <!-- Filter Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-sliders-horizontal"
                class="w-5 h-5"
              />
              <h2 class="text-lg font-semibold">
                Filter
              </h2>
            </div>
            <UButton
              v-if="hasActiveFilters"
              variant="ghost"
              color="neutral"
              size="xs"
              icon="i-lucide-x"
              class="cursor-pointer"
              @click="resetFilters"
            >
              Zurücksetzen
            </UButton>
          </div>

          <div class="space-y-6">
            <!-- Sort -->
            <div>
              <label
                id="sort-label-desktop"
                class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 block"
              >
                Sortieren nach
              </label>
              <USelect
                v-model="sortBy"
                :items="sortOptions"
                size="xl"
                class="w-full"
                aria-label="Sortieren nach"
                aria-labelledby="sort-label-desktop"
              />
            </div>

            <!-- Category Filter -->
            <div>
              <label class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 block">
                Kategorie
              </label>
              <div class="space-y-2">
                <button
                  v-for="option in categoryOptions"
                  :key="option.value"
                  type="button"
                  :aria-label="`Kategorie ${option.label} ${isSelected(option.value) ? 'entfernen' : 'auswählen'}`"
                  :aria-pressed="isSelected(option.value)"
                  :class="[
                    'w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left text-sm transition-colors cursor-pointer',
                    isSelected(option.value)
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  ]"
                  @click="toggleCategory(option.value)"
                >
                  <span class="font-medium">{{ option.label }}</span>
                  <span
                    class="w-2 h-2 rounded-full bg-pink-200"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <!-- Prep Time Filter -->
            <div>
              <label class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 block">
                Zubereitungszeit
              </label>
              <URadioGroup
                v-model="selectedPrepTime"
                :items="prepTimeOptions"
              />
            </div>

            <!-- Difficulty Filter -->
            <div>
              <label class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 block">
                Schwierigkeit
              </label>
              <URadioGroup
                v-model="selectedDifficulty"
                :items="difficultyOptions"
              />
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="lg:col-span-3">
        <!-- Hero Header -->
        <div class="mb-6 lg:mb-10">
          <h1 class="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4 lg:mb-6">
            Protein-Rezepte, die <br>
            <span class="text-primary relative underline decoration-wavy decoration-pink-200 underline-offset-8 decoration-4">
              wirklich schmecken.
            </span>
          </h1>
          <p class="text-neutral-600 dark:text-neutral-400 text-lg max-w-xl">
            Einfache High-Protein Rezepte für deine Fitnessziele. Optimiert für Geschmack und Leistung, in wenigen Minuten fertig.
          </p>
        </div>

        <div id="top-results"></div>
        <!-- Mobile Filter Bar -->
        <div
          ref="mobileFilterBar"
          :class="[
            'lg:hidden sticky top-0 z-20 bg-white -mx-4 px-4 py-4 transition-transform duration-300',
          ]"
        >
          <div class="space-y-3">
            <!-- Category Chips - Horizontal Scroll -->
            <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button
                v-for="option in categoryOptions"
                :key="option.value"
                type="button"
                :aria-label="`Kategorie ${option.label} ${isSelected(option.value) ? 'entfernen' : 'auswählen'}`"
                :aria-pressed="isSelected(option.value)"
                :class="[
                  'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  isSelected(option.value)
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                ]"
                @click="toggleCategory(option.value, true)"
              >
                {{ option.label }}
              </button>
            </div>

            <!-- Sort & Filter Row -->
            <div class="flex items-center gap-3">
              <USelect
                v-model="sortBy"
                :items="sortOptions"
                class="flex-1"
                aria-label="Sortieren nach"
              />
              <UButton
                icon="i-lucide-sliders-horizontal"
                color="neutral"
                variant="soft"
                size="lg"
                aria-label="Weitere Filter öffnen"
                @click="mobileFiltersOpen = true"
              >
                <UBadge
                  v-if="activeFilterCount > 0"
                  color="primary"
                  variant="solid"
                  size="sm"
                >
                  {{ activeFilterCount }}
                </UBadge>
              </UButton>
            </div>

            <!-- Active Filters Display -->
            <div
              v-if="hasActiveFilters"
              class="flex items-center gap-2 flex-wrap"
            >
              <span class="text-sm text-neutral-500">Aktiv:</span>
              <UBadge
                v-if="selectedDifficulty !== 'alle'"
                color="primary"
                variant="subtle"
                class="cursor-pointer"
                @click="selectedDifficulty = 'alle'"
              >
                {{ difficultyOptions.find(o => o.value === selectedDifficulty)?.label }}
                <UIcon
                  name="i-lucide-x"
                  class="w-3 h-3 ml-1"
                />
              </UBadge>
              <UBadge
                v-if="selectedPrepTime !== 'alle'"
                color="primary"
                variant="subtle"
                class="cursor-pointer"
                @click="selectedPrepTime = 'alle'"
              >
                {{ prepTimeOptions.find(o => o.value === selectedPrepTime)?.label }}
                <UIcon
                  name="i-lucide-x"
                  class="w-3 h-3 ml-1"
                />
              </UBadge>
              <button
                type="button"
                class="text-sm text-primary hover:underline"
                @click="resetFilters"
              >
                Alle löschen
              </button>
            </div>

            <!-- Results Count -->
            <p class="text-sm text-neutral-500">
              {{ filteredRecipes.length }} Rezepte
            </p>
          </div>
        </div>

        <!-- Spacer for sticky filter bar -->
        <div class="lg:hidden h-4" />

        <!-- Recipe Grid -->
        <div
          v-if="filteredRecipes.length === 0"
          class="text-center py-12"
        >
          <UIcon
            name="i-lucide-search-x"
            class="w-12 h-12 text-neutral-400 mx-auto mb-4"
          />
          <p class="text-neutral-600 dark:text-neutral-400">
            Keine Rezepte gefunden. Versuche andere Filter.
          </p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
        >
          <RecipeCard
            v-for="recipe in filteredRecipes"
            :key="recipe.path"
            :recipe="recipe"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Filter Slideover -->
    <USlideover
      v-model:open="mobileFiltersOpen"
      title="Filter"
      class="lg:hidden"
    >
      <template #body>
        <div class="space-y-6">
          <!-- Sort -->
          <div>
            <label
              id="sort-label-mobile"
              class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 block"
            >
              Sortieren nach
            </label>
            <USelect
              v-model="sortBy"
              :items="sortOptions"
              class="w-full"
              aria-label="Sortieren nach"
              aria-labelledby="sort-label-mobile"
            />
          </div>

          <!-- Category Filter -->
          <div>
            <label class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 block">
              Kategorie
            </label>
            <div class="space-y-2">
              <button
                v-for="option in categoryOptions"
                :key="option.value"
                type="button"
                :aria-label="`Kategorie ${option.label} ${isSelected(option.value) ? 'entfernen' : 'auswählen'}`"
                :aria-pressed="isSelected(option.value)"
                :class="[
                  'w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left text-sm transition-colors cursor-pointer',
                  isSelected(option.value)
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                ]"
                @click="toggleCategory(option.value)"
              >
                <span class="font-medium">{{ option.label }}</span>
                <span
                  class="w-2 h-2 rounded-full bg-pink-200"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <!-- Prep Time Filter -->
          <div>
            <label class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 block">
              Zubereitungszeit
            </label>
            <URadioGroup
              v-model="selectedPrepTime"
              :items="prepTimeOptions"
            />
          </div>

          <!-- Difficulty Filter -->
          <div>
            <label class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 block">
              Schwierigkeit
            </label>
            <URadioGroup
              v-model="selectedDifficulty"
              :items="difficultyOptions"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex gap-3">
          <UButton
            v-if="hasActiveFilters"
            variant="outline"
            color="neutral"
            class="cursor-pointer"
            @click="resetFilters"
          >
            Zurücksetzen
          </UButton>
          <UButton
            color="primary"
            class="flex-1 cursor-pointer"
            @click="mobileFiltersOpen = false"
          >
            {{ filteredRecipes.length }} Rezepte anzeigen
          </UButton>
        </div>
      </template>
    </USlideover>
  </UContainer>
</template>
