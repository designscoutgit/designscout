const { apiPlugin } = require('@storyblok/vue');

const OPEN_GRAPH = [
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content:
      'DesignScout | Brand Evolutions | Graphic Design | Chicago | Logo Design | Web Design | Apparel and T Shirt Design | Print Design',
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content:
      "Time to evolve? We solve growing pains with strategic brand evolutions rooted in your authentic brand story. Scout's honor.",
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content:
      'DesignScout | Brand Evolutions | Graphic Design | Chicago | Logo Design | Web Design | Apparel and T Shirt Design | Print Design',
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://www.designscout.tv',
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: '/images/socialShare.png',
  },
  { property: 'og:updated_time', content: new Date().toISOString() },
];

const TWITTER = [
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:site', content: '@DesignScoutChi' },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: 'DesignScout',
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content:
      "Time to evolve? We solve growing pains with strategic brand evolutions rooted in your authentic brand story. Scout's honor.",
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: '/images/socialShare.png',
  },
  {
    hid: 'twitter:image:alt',
    name: 'twitter:image:alt',
    content: 'DesignScout | Authenticity | Strategy | Honor | Evolution',
  },
];

module.exports = {
  ssr: false,
  target: 'server',
  head: {
    title: 'DesignScout | Brand Evolutions | Graphic Design | Chicago | Logo Design | Web Design | Apparel and T Shirt Design | Print Design',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          "Time to evolve? We solve growing pains with strategic brand evolutions rooted in your authentic brand story. Scout's honor.",
      },
      { hid: 'author', name: 'author', content: 'Danny Petrilli' },
      {
        hid: 'keywords',
        property: 'keywords',
        keywords:
          'Chicago graphic design agency, logo design services, web design, print design, custom t-shirt design, branding',
      },
      ...OPEN_GRAPH,
      ...TWITTER,
    ],
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
    ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_API_TOKEN, use: [apiPlugin] }],
    '@nuxt/content',
    '@nuxtjs/device',
    '@nuxt/image-edge',
    '@morev/vue-transitions/nuxt',
    // '@nuxtjs/supabase',
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
    port: process.env.NUXT_PORT || 3000,
    host: 'localhost',
  },
  router: {
    // set the base URL for your app to run on localhost
    base: '/',
  },
  app: {
    pageTransition: { name: 'storyblok', mode: 'out-in' }
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
};
