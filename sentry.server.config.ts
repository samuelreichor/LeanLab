import * as Sentry from '@sentry/nuxt'

Sentry.init({
  dsn: 'https://ce1d6c42ccf4f1b934dc4937722fd573@o4510657224769536.ingest.de.sentry.io/4510657225949264',
  tracesSampleRate: 0.1,
  enableLogs: false,
  sendDefaultPii: false,
  debug: false
})
