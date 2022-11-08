import ElementPlus from 'unplugin-element-plus/vite'

export default defineNuxtConfig({
  // meta
  // meta: {
  //   title: 'Element Plus + Nuxt 3',
  //   meta: [
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     {
  //       hid: 'description',
  //       name: 'description',
  //       content: 'ElementPlus + Nuxt3',
  //     },
  //   ],
  //   link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  // },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],

  // auto import components
  components: {
    dirs: [
      '~/components',
      '~/layoutComponents',
      '~/pagesComponents',
    ],
  },
  css: [
    'assets/style/root.css',
    'assets/style/index.scss',
  ],
  alias: {
    style: '/<rootDir>/assets/style',
  },
  // build
  build: {
    transpile: ['element-plus/es'],
  },

  vite: {
    plugins: [
      ElementPlus({
        defaultLocale: 'zhCn',
      }),
    ],
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  experimental: {
    reactivityTransform: true,
  },

  unocss: {
    preflight: true,
  },

  colorMode: {
    classSuffix: '',
  },
})
