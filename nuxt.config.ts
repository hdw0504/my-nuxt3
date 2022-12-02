import dayjs from 'dayjs'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
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
    'element-plus/theme-chalk/src/index.scss', // full import (autoimport has some error)
    'element-plus/theme-chalk/src/dark/css-vars.scss', // dark mode
    '~/assets/style/index.scss', // global css
  ],

  // https://color-mode.nuxtjs.org/#configuration
  colorMode: {
    classSuffix: '', // theme mode suffix name
  },

  unocss: {
    preflight: false,
  },

  app: {
    /**
     * If you are changing layouts as well as page,
     * the page transition you set here will not run.
     * Instead, you should set a layout transition.
     */
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

  // build
  build: {
    transpile: process.env.NODE_ENV === 'production' ? ['element-plus/es'] : [],
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
      AutoImport({
        resolvers: [
          // autoimport Feedback component like message and notification
          ElementPlusResolver({
            // ssr: true,
            // importStyle: 'sass',
            importStyle: false,
          }),
        ],
      }),
      Components({
        dts: true,
        resolvers: [
          // autoimport component and css
          ElementPlusResolver({
            // if turn ssr true will full Import when build project
            // ssr: true,
            // importStyle: 'sass',
            importStyle: false,
          }),
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
