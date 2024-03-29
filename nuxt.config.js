const { apiPlugin } = require('@storyblok/vue');
const { join } = require('path');
const redirectHttpMiddleware = require('./middleware/redirect-http');

module.exports = {
  ssr: true,
  target: 'static',
  head: { 
    link: [
      { hid: "canonical", rel: "canonical", href: 'https://www.designscout.com' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Apple touch icon
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/apple-touch-icon.png'
      },
      // Icons for Android
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/icons/android-chrome-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/icons/android-chrome-512x512.png'
      },
      // Favicon for browsers
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/favicon-16x16.png'
      }
    ],
  },
  build: {
    transpile: [
      '@marvr/storyblok-rich-text-vue-renderer',
      'gsap',
    ],
    loaders: {
      scss: {
        implementation: require('sass'),
      },
    },
    extend(config, { isClient, isServer }) {
      if (isServer) {
        config.module.rules.push({
          test: /\.node$/,
          loader: 'node-loader',
        });
      }
    },
  },
  modules: [
    [
      '@storyblok/nuxt',
      {
        accessToken: 'rd1GrPIgxeRvpje21SjVnAtt',
        use: [apiPlugin], 
      },
    ],    
    '@nuxt/content',
    '@nuxtjs/device',
    '@nuxt/image-edge',
    '@morev/vue-transitions/nuxt',
    '@nuxtjs/supabase',
    ['@dargmuesli/nuxt-cookie-control', {
      colors: {
        checkboxActiveBackground: '#00A34A', // text-green-600
        modalBackground: '#fff',
        barBackground: '#FFFFFF',
        barButtonBackground: '#f7f5f0',
        barButtonColor: '#303a3e',
        barButtonHoverBackground: '#303a3e',
        barButtonHoverColor: '#f7f5f0',
        barTextColor: '#706D5F',
        modalButtonBackground: '#f7f5f0',
        modalButtonColor: '#303a3e',
        modalButtonHoverBackground: '#303a3e',
        modalButtonHoverColor: '#f7f5f0',
        modalOverlay: '#000',
        modalOverlayOpacity: 0.5,
        modalTextColor: '#706D5F',
        modalUnsavedColor: '#fff',

        checkboxActiveBackground: '#F7F5F0',
        checkboxActiveCircleBackground: '#fff',
        checkboxDisabledBackground: '#ddd',
        checkboxDisabledCircleBackground: '#fff',
        checkboxInactiveBackground: '#2A3336',
        checkboxInactiveCircleBackground: '#fff',
      },
      closeModalOnClickOutside: true,
      // isControlButtonEnabled: false,
      cookies: {
        necessary: [
          {
            description: {
              de: 'Dieser Cookie tut etwas.',
              en: ' This cookie does something very very very very very very very long.',
            },
            name: {
              de: 'Notwendiger Cookie',
              en: 'Necessary Cookie',
            },
            targetCookieIds: ["__cf_bm", "aka_debug"],
          },
        ],
        optional: [
          {
            id: 'op',
            name: 'Optional Cookie',
            links: {
              'https://www.designscout.com/privacy-policy': 'Privacy Policy',
              // 'https://example.cop': null,
            },
            targetCookieIds: ["li_sugr", "AnalyticsSyncHistory", "bscookie", "vuid", "#collect", "_ga_#", "_ga", "bcookie", "UserMatchHistory", "lidc"],
          },
        ],
      },
      isCookieIdVisible: true,
      isIframeBlocked: true,
      locales: ['en', 'de'],
      localeTexts: {
        de: {
          iframeBlocked: 'Bitte funktionale Cookies aktivieren:',
        },
      },
    }],
    // '@nuxtjs/tailwindcss',
    // '@unocss/nuxt',
    // '@nuxtjs/fontaine',
    // '@nuxtjs/critters',
    // '@nuxt/image-edge',
  ],
  css: [
    // '@unocss/reset/tailwind.css',
    '~/assets/scss/style.scss'
  ],
  plugins: [
    { src: '~/plugins/acsb-script.js', mode: 'client'}
  ],  
  content: {
    // Set the parser to use YAML instead of Markdown
    yaml: {
      safe: true,
    },
  },
  components: true,
  server: {
    // configure the port and host for your dev server
    port: process.env.PORT || 8080, // Default is 3000
    host: process.env.HOST || '0.0.0.0', // Default is localhost, use '0.0.0.0' to accept connections from any IP
  },
  vite: {
    optimizeDeps: {
      exclude: ['fsevents'],
    },
  },
  app: {
    pageTransition: { name: 'storyblok', mode: 'out-in' },
    // head: {
    //   charset: 'utf-8',
    //   viewport: 'width=device-width, initial-scale=1',
    //   meta: [
    //     {
    //       hid: 'site_name',
    //       name: 'site_name',
    //       content:
    //         'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
    //     },
    //     {
    //       hid: 'og:site_name',
    //       name: 'og:site_name',
    //       content:
    //         'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
    //     },
    //     {
    //       hid: 'description',
    //       name: 'description',
    //       content:
    //         "We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands.",
    //     },
    //     {
    //       hid: 'og:description',
    //       name: 'og:description',
    //       content:
    //         "We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands.",
    //     },
    //     {
    //       hid: 'title',
    //       name: 'title',
    //       content:
    //         'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
    //     },
    //     {
    //       hid: 'og:title',
    //       name: 'og:title',
    //       content:
    //         'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
    //     },
    //     {
    //       hid: 'og:url',
    //       name: 'og:url',
    //       content: 'https://www.designscout.com',
    //     },
    //     {
    //       hid: 'image',
    //       name: 'image',
    //       content: 'https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp',
    //     },
    //     {
    //       hid: 'og:image',
    //       name: 'og:image',
    //       content: 'https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp',
    //     },
    //     { property: 'og:updated_time', content: new Date().toISOString() },
    //     // Twitter card
    //     {
    //       hid: 'twitter:description',
    //       name: 'twitter:description',
    //       content:
    //         "We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands.",
    //     },
    //     {
    //       hid: 'twitter:title',
    //       name: "twitter:title",
    //       content:
    //         'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
    //     },
    //     {
    //       hid: 'twitter:url',
    //       name: 'twitter:url',
    //       content: 'https://www.designscout.com',
    //     },
    //     {
    //       hid: 'twitter:image',
    //       name: 'twitter:image',
    //       content: 'https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp',
    //     },
    //   ],
    // },
  },
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },
  serverMiddleware: [
    { path: '/', handler: redirectHttpMiddleware },
    '~/middleware/emailMiddleware.js'
  ],
  hooks: {
    'vite:extendConfig': (config, { isClient, isServer }) => {
      if (isClient)
        config.resolve.alias.vue = 'vue/dist/vue.esm-bundler.js'
    },
  },
  image: {
    storyblok: {
      baseURL: 'https://a.storyblok.com',
    },
  },
  publicRuntimeConfig: {
    storyblokApiToken: "rd1GrPIgxeRvpje21SjVnAtt",
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
};

export default {
  loading: false
}

// export default {
//   head: {
//     title: 'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
//     meta: [
//       { charset: 'utf-8' },
//       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
//       {
//         hid: 'site_name',
//         name: 'site_name',
//         content:
//           'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
//       },
//       {
//         hid: 'og:site_name',
//         name: 'og:site_name',
//         content:
//           'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
//       },
//       {
//         hid: 'description',
//         name: 'description',
//         content:
//           "We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands.",
//       },
//       {
//         hid: 'og:description',
//         name: 'og:description',
//         content:
//           "We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands.",
//       },
//       {
//         hid: 'title',
//         name: 'title',
//         content:
//           'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
//       },
//       {
//         hid: 'og:title',
//         name: 'og:title',
//         content:
//           'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
//       },
//       {
//         hid: 'og:url',
//         name: 'og:url',
//         content: 'https://www.designscout.com',
//       },
//       {
//         hid: 'image',
//         name: 'image',
//         content: 'https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp',
//       },
//       {
//         hid: 'og:image',
//         name: 'og:image',
//         content: 'https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp',
//       },
//       { property: 'updated_time', content: new Date().toISOString() },
//       { property: 'og:updated_time', content: new Date().toISOString() },
//       // Twitter card
//       {
//         hid: 'twitter:description',
//         name: 'twitter:description',
//         content:
//           "We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands.",
//       },
//       {
//         hid: 'twitter:title',
//         name: "twitter:title",
//         content:
//           'DesignScout | Chicago Branding Agency | Ego-Free Since 2003™',
//       },
//       {
//         hid: 'twitter:url',
//         name: 'twitter:url',
//         content: 'https://www.designscout.com',
//       },
//       {
//         hid: 'twitter:image',
//         name: 'twitter:image',
//         content: 'https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp',
//       },
//     ]
//   }
// }
