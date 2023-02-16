import dayjs from 'dayjs'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vue-macros/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@element-plus/nuxt',
    '@nuxtjs/i18n',
    'unplugin-icons/nuxt',
  ],

  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores'],
  },

  components: {
    dirs: [
      {
        path: '~/components',
        global: true,
      },
      '~/components/layout',
    ],
  },

  css: [
    // '@unocss/reset/tailwind.css',
    '@unocss/reset/eric-meyer.css',
    '~/assets/style/index.scss', // global css
  ],

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
    vueI18n: {
      legacy: false,
      locale: 'en',
    },
  },

  unocss: {
    preflight: false,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    keepalive: true,
  },

  experimental: {
    reactivityTransform: true,
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
          additionalData: '@use "@/assets/style/element/index.scss";',
        },
      },
    },
    plugins: [
      Components({
        dts: true,
        resolvers: [
          IconsResolver({
            // prefix: 'i', // defalt prefix
            customCollections: ['icons'],
          }),
        ],
      }),
      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
        customCollections: {
          icons: FileSystemIconLoader('./assets/icons'),
        },
      }),
    ],
  },
})
