export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  components: {
    dirs: [
      '~/components',
      '~/layoutComponents',
      '~/pagesComponents',
    ],
  },
  css: [
    'assets/style/root.css',
  ],
  alias: {
    style: '/<rootDir>/assets/style',
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
