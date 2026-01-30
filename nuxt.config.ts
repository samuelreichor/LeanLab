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
        { rel: 'preconnect', href: 'https://consent.cookiebot.com', crossorigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://consent.cookiebot.com' },
        { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicons/site.webmanifest' }
      ],
      script: [
        {
          'id': 'gtm-script',
          'type': 'text/plain',
          'data-cookieconsent': 'marketing,statistics',
          'innerHTML': `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NTZ8T3WH');`
        }
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
      cssCodeSplit: true
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
    provider: 'ipx',
    densities: [1],
    screens: {
      xs: 320,
      sm: 480,
      md: 640,
      lg: 768,
      xl: 1024,
      xxl: 1280
    }
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
  },

  sitemap: {
    zeroRuntime: true
  }
})
