import dayjs from 'dayjs'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

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
    'assets/style/root.scss',
  ],

  // antfu/vitesse-nuxt3 default config
  experimental: {
    reactivityTransform: true,
  },
  vueuse: {
    ssrHandlers: true,
  },
  unocss: {
    // Injecting `@unocss/reset/tailwind.css` entry
    preflight: false,
  },
  colorMode: {
    classSuffix: '',
  },
  // naive-ui
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
        : ['@juggle/resize-observer'],
  },
  vite: {
  // need add declare from xxx.d.ts
    define: {
      __BUILD_TIME__: JSON.stringify(dayjs().format('YYYY/MM/DD HH:mm')),
    },
    ssr: {
      noExternal: ['naive-ui'],
    },
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()], // 全自动按需引入naive-ui组件
      }),
    ],
    // 解决在开发模式下降低 naive-ui 引起的打包缓慢
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
    },
  },
})
