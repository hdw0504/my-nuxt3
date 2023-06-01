import dayjs from 'dayjs'

export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vue-macros/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@element-plus/nuxt',
    '@nuxtjs/i18n',
    'nuxt-swiper',
    'nuxt-icons',
  ],

  css: [
    // '@unocss/reset/tailwind.css',
    '@unocss/reset/eric-meyer.css',
    '~/styles/index.scss', // global css
  ],

  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores'],
  },

  elementPlus: {
    importStyle: 'scss',
    themes: ['dark'],
  },

  // https://color-mode.nuxtjs.org/#configuration
  colorMode: {
    // default options
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    // hid: 'nuxt-color-mode-script',
    // globalName: '__NUXT_COLOR_MODE__',
    // componentName: 'ColorScheme',
    // classPrefix: '',
    classSuffix: '',
    // storageKey: 'nuxt-color-mode'
  },

  i18n: {
    locales: [
      { code: 'en', file: 'en_US.json', name: 'English' },
      { code: 'tw', file: 'zh_TW.json', name: '繁體中文' },
      { code: 'zh', file: 'zh_CN.json', name: '简体中文' },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
  },

  swiper: {
    // Swiper options
    // ----------------------
    // prefix: 'Swiper',
    // styleLang: 'css',
    modules: ['autoplay', 'controller'],
  },

  unocss: {
    preflight: false,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    buildAssetsDir: 'static',
    // keepalive: true,
  },

  vite: {
    // need add declare from xxx.d.ts
    define: {
      __BUILD_TIME__: JSON.stringify(dayjs().format('YYYY/MM/DD HH:mm')),
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 主题定制方案 (not as *)
          additionalData: '@use "~/styles/element/index.scss";',
        },
      },
    },
  },
})
