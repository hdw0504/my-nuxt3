import dayjs from 'dayjs'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  alias: {
    style: '/<rootDir>/assets/style',
  },
  // nuxt auto import components
  components: {
    dirs: [
      '~/components',
      '~/layoutComponents',
      '~/pagesComponents',
    ],
  },
  // global css
  css: [
    'assets/style/root.css',
  ],

  // antfu/vitesse-nuxt3 default config
  experimental: {
    reactivityTransform: true,
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  vite: {
    define: {
      __BUILD_TIME__: JSON.stringify(dayjs().format('YYYY/MM/DD HH:mm')),
    },
  },
})
