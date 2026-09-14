import * as Sentry from '@sentry/nuxt'

/**
 * Sentry wird NICHT hier initialisiert, sondern erst nach Einwilligung in die Kategorie
 * "Statistik" (measurement) durch das Consent-Plugin (app/plugins/consent.client.ts).
 *
 * Das @sentry/nuxt Modul lädt diese Datei automatisch – sie stellt nur die Konfiguration bereit.
 */
export const sentryConfig: Parameters<typeof Sentry.init>[0] = {
  dsn: 'https://ce1d6c42ccf4f1b934dc4937722fd573@o4510657224769536.ingest.de.sentry.io/4510657225949264',
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()],
  enableLogs: false,
  sendDefaultPii: false,
  debug: false
}
