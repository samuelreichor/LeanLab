// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxtjs/seo', '@nuxt/content', '@sentry/nuxt/module', '@nuxt/scripts'],

  devtools: {
    enabled: false
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
        { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicons/site.webmanifest' }
      ]
    }
  },

  scripts: {
    registry: {
      googleTagManager: {
        id: 'GTM-NTZ8T3WH'
      }
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
  routeRules: {
    // Prerender all static pages
    '/**': { prerender: true },
    // Keep API routes as serverless
    '/api/**': { prerender: false }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  sourcemap: {
    client: 'hidden'
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ogImage: {
    fonts: [
      // will load the Noto Sans font from Google fonts
      'Public+Sans:400',
      'Public+Sans:600',
      'Public+Sans:700'
    ]
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Fit Kitchen',
      url: 'https://fit-kitchen.at',
      logo: 'https://fit-kitchen.at/logo.png'
    }
  },

  sentry: {
    org: 'fit-kitchen',
    project: 'javascript-nuxt',
    autoInjectServerSentry: 'top-level-import'
  }
})
