import * as Sentry from '@sentry/nuxt'

declare global {
  interface Window {
    Cookiebot?: {
      consent: {
        necessary: boolean
        preferences: boolean
        statistics: boolean
        marketing: boolean
      }
    }
  }
}

const sentryConfig = {
  dsn: 'https://ce1d6c42ccf4f1b934dc4937722fd573@o4510657224769536.ingest.de.sentry.io/4510657225949264',
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()],
  enableLogs: false,
  sendDefaultPii: false,
  debug: false
}

// Check if Cookiebot consent for statistics is already given
const hasConsent = typeof window !== 'undefined'
  && window.Cookiebot?.consent?.statistics

// Initialize Sentry only if consent is already given
if (hasConsent) {
  Sentry.init(sentryConfig)
}

// Listen for consent changes
if (typeof window !== 'undefined') {
  window.addEventListener('CookiebotOnAccept', () => {
    if (window.Cookiebot?.consent?.statistics && !Sentry.getClient()) {
      Sentry.init(sentryConfig)
    }
  })
}
