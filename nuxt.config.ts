import dayjs from 'dayjs'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@element-plus/nuxt',
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
    '@unocss/reset/tailwind.css',
    '~/assets/style/index.scss', // global css
  ],

  elementPlus: {
    importStyle: 'scss',
    themes: ['dark'],
  },

  // https://color-mode.nuxtjs.org/#configuration
  colorMode: {
    classSuffix: '', // theme mode suffix name
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

  // vueuse
  vueuse: {
    ssrHandlers: true,
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
