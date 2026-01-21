// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxtjs/seo', '@nuxt/content', '@sentry/nuxt/module'],

  $production: {
    devtools: {
      enabled: false
    },
    sentry: {
      org: 'fit-kitchen',
      project: 'fit-kitchen',
      autoInjectServerSentry: 'top-level-import'
    }
  },

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'de'
      },
      titleTemplate: '%s | Fit Kitchen',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { name: 'apple-mobile-web-app-title', content: 'Fit Kitchen' }
      ],
      link: [
        { rel: 'canonical', href: 'https://fit-kitchen.at' },
        { rel: 'preconnect', href: 'https://o4510657224769536.ingest.de.sentry.io' },
        { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicons/site.webmanifest' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://fit-kitchen.at',
    name: 'Fit Kitchen',
    defaultLocale: 'de'
  },

  content: {
    renderer: {
      anchorLinks: false
    }
  },

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  ui: {
    colorMode: false
  },

  runtimeConfig: {
    mailchimpApiKey: process.env.MAILCHIMP_API_KEY,
    mailchimpAudienceId: process.env.MAILCHIMP_AUDIENCE_ID
  },

  sourcemap: {
    client: 'hidden'
  },

  features: {
    inlineStyles: true
  },

  experimental: {
    viewTransition: true
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/rezepte'
      ]
    },
    compressPublicAssets: true
  },

  vite: {
    build: {
      cssCodeSplit: true,
      target: 'esnext',
      modulePreload: {
        polyfill: false
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    defaults: {
      preload: true
    },
    providers: {
      google: false
    }
  },

  image: {
    provider: 'ipx'
  },

  ogImage: {
    zeroRuntime: true
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Fit Kitchen',
      url: 'https://fit-kitchen.at',
      logo: 'https://fit-kitchen.at/logo.png'
    }
  }
})
