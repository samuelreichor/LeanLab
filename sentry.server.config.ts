import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  dsn: "https://ce1d6c42ccf4f1b934dc4937722fd573@o4510657224769536.ingest.de.sentry.io/4510657225949264",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending of user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nuxt/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
