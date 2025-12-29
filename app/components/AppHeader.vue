<script setup lang="ts">
const route = useRoute()
const items = computed(() => [{
  label: 'Rezepte',
  icon: 'i-lucide-chef-hat',
  to: '/rezepte',
  active: route.path.startsWith('/rezepte')
},
{
  label: 'Ernährungswissen',
  icon: 'i-lucide-book-open',
  to: '/ernaehrungswissen',
  active: route.path.startsWith('/ernaehrungswissen')
},
{
  label: 'Über uns',
  icon: 'i-lucide-users',
  to: '/ueber-uns'
}])

// Mobile menu state
const mobileMenuOpen = ref(false)
const mobileNav = useTemplateRef<HTMLElement>('mobileNav')

// Focus first link when menu opens
watch(mobileMenuOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    const firstLink = mobileNav.value?.querySelector('a')
    firstLink?.focus()
  }
})

// Close menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
  >
    Zum Inhalt springen
  </a>
  <UContainer>
    <UHeader
      v-model:open="mobileMenuOpen"
      :ui="{ root: 'border-none bg-none text-white', container: 'bg-primary rounded-2xl mt-4 max-w-none sm:px-6 lg:px-8', toggle: 'text-white hover:text-primary focus:text-primary', header: 'bg-primary rounded-2xl mt-4 max-w-none mx-4 sm:mx-6 sm:px-6 lg:px-8' }"
    >
      <template #left>
        <NuxtLink
          to="/"
          aria-label="Fit Kitchen - Zur Startseite"
          class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-lg"
        >
          <AppLogo class="w-auto h-10 shrink-0" />
        </NuxtLink>
      </template>

      <template #default>
        <UNavigationMenu
          :items="items"
          :ui="{
            link: 'text-lg text-white [&[aria-current=page]]:text-primary [&[aria-current=page]]:before:bg-white data-[state=open]:text-white hover:text-white data-[state=open]:before:bg-primary-400 hover:before:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-lg',
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
          label="Suchen..."
        />
      </template>

      <template #body>
        <nav
          ref="mobileNav"
          aria-label="Mobile Navigation"
          class=""
        >
          <ul class="space-y-1">
            <li
              v-for="item in items"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                :class="{ 'bg-primary/10 text-primary': item.active }"
              >
                <UIcon
                  :name="item.icon"
                  class="w-5 h-5"
                />
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </template>
    </UHeader>
  </UContainer>
</template>
