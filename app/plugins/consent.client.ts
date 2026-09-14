import type { AllConsentNames, ConsentRuntimeOptions, ConsentType, HasCondition, Script } from 'c15t'
import { getOrCreateConsentRuntime } from 'c15t'
import { googleTagManager } from '@c15t/scripts/google-tag-manager'
import * as Sentry from '@sentry/nuxt'
import { sentryConfig } from '~~/sentry.client.config'

/**
 * Consent-Management mit c15t (https://c15t.com).
 *
 * - Google Tag Manager wird sofort geladen, aber mit Consent Mode v2 "denied"-Defaults.
 *   Nach einer Einwilligung pusht c15t automatisch ein `consent update` + das Event `consent-update`.
 * - Sentry wird erst nach Einwilligung in "Statistik" (measurement) initialisiert.
 * - Ohne NUXT_PUBLIC_C15T_BACKEND_URL läuft c15t im Offline-Modus (Speicherung nur im Browser).
 */
export default defineNuxtPlugin(() => {
  const { gtmId, c15tBackendUrl } = useRuntimeConfig().public

  const scripts: Script[] = []

  if (gtmId) {
    scripts.push(googleTagManager({ id: gtmId }))
  }

  scripts.push({
    id: 'sentry',
    callbackOnly: true,
    category: 'measurement',
    onLoad: ({ hasConsent }) => {
      if (hasConsent && !Sentry.getClient()) {
        Sentry.init(sentryConfig)
      }
    }
  })

  const shared = {
    consentCategories: ['necessary', 'measurement', 'marketing'] satisfies AllConsentNames[],
    scripts,
    i18n: {
      locale: 'de',
      detectBrowserLanguage: false
    },
    reloadOnConsentRevoked: true
  }

  const options: ConsentRuntimeOptions = c15tBackendUrl
    ? { mode: 'hosted', backendURL: c15tBackendUrl, ...shared }
    : { mode: 'offline', ...shared }

  const { consentStore } = getOrCreateConsentRuntime(options)

  // Zustand-Store -> Vue-Reaktivität
  const state = shallowRef(consentStore.getState())
  consentStore.subscribe((next) => {
    state.value = next
  })

  const consent = {
    store: consentStore,
    activeUI: computed(() => state.value.activeUI),
    consents: computed(() => state.value.consents),
    selectedConsents: computed(() => state.value.selectedConsents),
    categories: computed<ConsentType[]>(() => state.value.getDisplayedConsents()),
    hasConsented: computed(() => state.value.hasConsented()),
    has: (condition: HasCondition<AllConsentNames>) => state.value.has(condition),
    acceptAll: () => consentStore.getState().saveConsents('all', { uiSource: 'banner' }),
    rejectAll: () => consentStore.getState().saveConsents('necessary', { uiSource: 'banner' }),
    saveSelection: () => consentStore.getState().saveConsents('custom', { uiSource: 'dialog' }),
    setSelected: (name: AllConsentNames, value: boolean) => consentStore.getState().setSelectedConsent(name, value),
    openDialog: () => consentStore.getState().setActiveUI('dialog', { force: true }),
    closeDialog: () => consentStore.getState().setActiveUI(consentStore.getState().hasConsented() ? 'none' : 'banner')
  }

  return {
    provide: { consent }
  }
})
