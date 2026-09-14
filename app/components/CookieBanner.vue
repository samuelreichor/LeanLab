<script setup lang="ts">
import type { AllConsentNames } from 'c15t'

const consent = useConsent()

const labels: Record<AllConsentNames, { title: string, description: string }> = {
  necessary: {
    title: 'Notwendig',
    description: 'Erforderlich für die Grundfunktionen der Website, z. B. das Speichern deiner Cookie-Einstellungen. Kann nicht deaktiviert werden.'
  },
  functionality: {
    title: 'Funktional',
    description: 'Ermöglicht erweiterte Funktionen und Komfort-Features.'
  },
  experience: {
    title: 'Personalisierung',
    description: 'Passt Inhalte und Darstellung an deine Nutzung an.'
  },
  measurement: {
    title: 'Statistik',
    description: 'Hilft uns zu verstehen, wie die Website genutzt wird (Google Analytics) und technische Fehler zu erkennen (Sentry).'
  },
  marketing: {
    title: 'Marketing',
    description: 'Ermöglicht personalisierte Werbung und die Erfolgsmessung von Kampagnen (Google Tag Manager).'
  }
}

const showBanner = computed(() => consent?.activeUI.value === 'banner')
const dialogOpen = computed({
  get: () => consent?.activeUI.value === 'dialog',
  set: (open) => {
    if (!open) consent?.closeDialog()
  }
})

const categories = computed(() => consent?.categories.value ?? [])

function isSelected(name: AllConsentNames) {
  return consent?.selectedConsents.value[name] ?? false
}

function toggle(name: AllConsentNames, value: boolean) {
  consent?.setSelected(name, value)
}
</script>

<template>
  <div>
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div
        v-if="showBanner"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
        class="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 print:hidden"
      >
        <UCard
          class="mx-auto max-w-3xl shadow-xl"
          :ui="{ body: 'p-4 sm:p-6' }"
        >
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div class="space-y-1">
              <p
                id="cookie-banner-title"
                class="font-semibold text-highlighted"
              >
                Cookies & Datenschutz
              </p>
              <p
                id="cookie-banner-description"
                class="text-sm text-muted"
              >
                Wir verwenden Cookies für Statistik und Marketing, um Fit Kitchen zu verbessern.
                Du kannst deine Auswahl jederzeit in den
                <NuxtLink
                  to="/datenschutz"
                  class="underline underline-offset-2 hover:text-highlighted"
                >
                  Datenschutzhinweisen
                </NuxtLink>
                nachlesen und ändern.
              </p>
            </div>

            <div class="flex shrink-0 flex-wrap gap-2 md:flex-col md:items-stretch">
              <UButton
                label="Alle akzeptieren"
                color="primary"
                @click="consent?.acceptAll()"
              />
              <UButton
                label="Nur notwendige"
                color="neutral"
                variant="outline"
                @click="consent?.rejectAll()"
              />
              <UButton
                label="Anpassen"
                color="neutral"
                variant="ghost"
                @click="consent?.openDialog()"
              />
            </div>
          </div>
        </UCard>
      </div>
    </Transition>

    <UModal
      v-model:open="dialogOpen"
      title="Cookie-Einstellungen"
      description="Wähle aus, welche Kategorien du erlauben möchtest. Notwendige Cookies sind immer aktiv."
    >
      <template #body>
        <ul class="divide-y divide-default">
          <li
            v-for="category in categories"
            :key="category.name"
            class="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div class="space-y-1">
              <p class="font-medium text-highlighted">
                {{ labels[category.name].title }}
              </p>
              <p class="text-sm text-muted">
                {{ labels[category.name].description }}
              </p>
            </div>
            <USwitch
              :model-value="category.disabled ? true : isSelected(category.name)"
              :disabled="category.disabled"
              :aria-label="labels[category.name].title"
              @update:model-value="toggle(category.name, $event)"
            />
          </li>
        </ul>
      </template>

      <template #footer>
        <div class="flex w-full flex-wrap justify-end gap-2">
          <UButton
            label="Nur notwendige"
            color="neutral"
            variant="outline"
            @click="consent?.rejectAll()"
          />
          <UButton
            label="Auswahl speichern"
            color="neutral"
            variant="soft"
            @click="consent?.saveSelection()"
          />
          <UButton
            label="Alle akzeptieren"
            color="primary"
            @click="consent?.acceptAll()"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
