const { apiPlugin } = require('@storyblok/vue');

const OPEN_GRAPH = [
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content:
      'Branding Agency | Ego-Free Since 2003 | DesignScout',
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content:
      "Welcome to DesignScout, a branding agency. We create bold brands for businesses that stand out. Our Troop Offers: Logo Design, Brand Strategy, Brand Messaging, Brand Websites, Restaurant Branding, and Packaging Design. Woman Owned.",
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content:
      'Branding Agency | Ego-Free Since 2003 | DesignScout',
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://www.designscout.com',
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: '/images/site_image.webp',
  },
  { property: 'og:updated_time', content: new Date().toISOString() },
];


module.exports = {
  ssr: false,
  target: 'server',
  head: {
    link: [
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
        accessToken: 'HycKukPJp5mMudcXuopGqgtt',
        use: [apiPlugin],
      },
    ],    
    '@nuxt/content',
    '@nuxtjs/device',
    '@nuxt/image-edge',
    '@morev/vue-transitions/nuxt',
    '@nuxtjs/supabase',
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
  router: {
    // set the base URL for your app to run on localhost
    base: '/',
  },
  app: {
    pageTransition: { name: 'storyblok', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },
  serverMiddleware: ['~/middleware/emailMiddleware.js'],
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
    storyblokApiToken: process.env.STORYBLOK_API_TOKEN,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
};
